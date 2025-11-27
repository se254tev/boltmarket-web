const express = require('express');
const axios = require('axios');
const router = express.Router();
const db = require('../db');
const { requireAuth } = require('../middleware/auth');
require('dotenv').config();

// Generate MPESA OAuth token
async function getAccessToken() {
  const url = 'https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64');

  const { data } = await axios.get(url, {
    headers: { Authorization: `Basic ${auth}` }
  });

  return data.access_token;
}

// STK Push Payment
router.post('/stkpush', requireAuth, async (req, res, next) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).json({ success: false, message: 'Phone and amount are required' });
    }

    const formattedPhone = phone.replace(/^0/, '254'); // Convert 07xxxx to 2547xxxx

    // Create DB record before initiating STK
    const { rows } = await db.query(
      `INSERT INTO payments (user_id, amount, method, status)
       VALUES ($1, $2, 'mpesa', 'pending')
       RETURNING id`,
      [req.user.id, amount]
    );

    const paymentId = rows[0].id;

    // Generate Access Token
    const token = await getAccessToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:\.Z]/g, '') // Remove unwanted characters
      .slice(0, 14);

    const password = Buffer.from(
      process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp
    ).toString('base64');

    // STK Push endpoint
    const stkUrl = 'https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest';

    // Send STK Push to Safaricom
    const { data } = await axios.post(
      stkUrl,
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: formattedPhone,
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: formattedPhone,
        CallBackURL: process.env.MPESA_CALLBACK_URL,
        AccountReference: `PAY-${paymentId}`,
        TransactionDesc: 'Payment'
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // Save CheckoutRequestID for matching callback
    await db.query(
      `UPDATE payments SET checkout_id=$1 WHERE id=$2`,
      [data.CheckoutRequestID, paymentId]
    );

    res.json({
      success: true,
      paymentId,
      checkoutId: data.CheckoutRequestID,
      message: 'STK Push sent to phone'
    });

  } catch (err) {
    next(err);
  }
});

// MPESA Callback
router.post('/callback', async (req, res, next) => {
  try {
    const callback = req.body.Body?.stkCallback;

    if (!callback) return res.status(400).json({ success: false });

    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResultCode,
      ResultDesc,
      CallbackMetadata
    } = callback;

    // Extract data
    let receipt = null;
    let phone = null;
    let amount = null;

    if (CallbackMetadata?.Item) {
      for (const item of CallbackMetadata.Item) {
        if (item.Name === 'MpesaReceiptNumber') receipt = item.Value;
        if (item.Name === 'PhoneNumber') phone = item.Value;
        if (item.Name === 'Amount') amount = item.Value;
      }
    }

    const status = ResultCode === 0 ? 'success' : 'failed';

    // Update DB
    await db.query(
      `UPDATE payments 
       SET status=$1, receipt=$2, phone=$3, amount=$4, result_desc=$5
       WHERE checkout_id=$6`,
      [status, receipt, phone, amount, ResultDesc, CheckoutRequestID]
    );

    // MPESA requires this acknowledgment
    res.json({ ResultCode: 0, ResultDesc: 'Accepted' });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
