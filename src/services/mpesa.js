// M-Pesa payment integration service
// Includes mock implementation and real API integration guide

const MPESA_API_URL = process.env.REACT_APP_MPESA_API_URL || 'https://sandbox.safaricom.co.ke/mpesa';
const MPESA_CONSUMER_KEY = process.env.REACT_APP_MPESA_CONSUMER_KEY || '';
const MPESA_CONSUMER_SECRET = process.env.REACT_APP_MPESA_CONSUMER_SECRET || '';
const MPESA_SHORT_CODE = process.env.REACT_APP_MPESA_SHORT_CODE || '174379';
const MPESA_PASS_KEY = process.env.REACT_APP_MPESA_PASS_KEY || '';
const MPESA_CALLBACK_URL = process.env.REACT_APP_MPESA_CALLBACK_URL || 'https://your-app.com/mpesa-callback';

/**
 * M-Pesa STK Push - Initiate payment prompt on user's phone
 * @param {Object} data - Payment data
 * @returns {Promise} Payment initiation response
 */
export const initiateSTKPush = async (data) => {
  const {
    amount,
    phoneNumber,
    accountReference,
    transactionDesc,
    externalId,
  } = data;

  // Format phone number for M-Pesa (254712345678 format)
  const formattedPhone = phoneNumber.replace(/^0/, '254');

  try {
    // For production, use real M-Pesa API
    // const accessToken = await getAccessToken();
    
    // Mock implementation for development
    console.log('[M-Pesa] Initiating STK Push:', {
      amount,
      phoneNumber: formattedPhone,
      accountReference,
      transactionDesc,
    });

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ResponseCode: '0',
          ResponseDescription: 'Success. Request accepted for processing',
          MerchantRequestID: `MR_${Date.now()}`,
          CheckoutRequestID: `WEB_${Date.now()}`,
          CustomerMessage: 'Success. Request accepted for processing',
        });
      }, 1000);
    });

    // Real M-Pesa API call (uncomment for production):
    // const timestamp = new Date().toISOString().replace(/[:\-.]/g, '');
    // const password = Buffer.from(
    //   `${MPESA_SHORT_CODE}${MPESA_PASS_KEY}${timestamp}`
    // ).toString('base64');

    // const response = await fetch(`${MPESA_API_URL}/stkpush/v1/processrequest`, {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     BusinessShortCode: MPESA_SHORT_CODE,
    //     Password: password,
    //     Timestamp: timestamp,
    //     TransactionType: 'CustomerPayBillOnline',
    //     Amount: Math.ceil(amount),
    //     PartyA: formattedPhone,
    //     PartyB: MPESA_SHORT_CODE,
    //     PhoneNumber: formattedPhone,
    //     CallBackURL: MPESA_CALLBACK_URL,
    //     AccountReference: accountReference,
    //     TransactionDesc: transactionDesc,
    //   }),
    // });
    // return response.json();
  } catch (error) {
    console.error('[M-Pesa] STK Push error:', error);
    throw error;
  }
};

/**
 * Get M-Pesa access token
 * @returns {Promise<string>} Access token
 */
export const getAccessToken = async () => {
  try {
    // Mock token for development
    return `mock_token_${Date.now()}`;

    // Real M-Pesa API call (uncomment for production):
    // const auth = Buffer.from(
    //   `${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`
    // ).toString('base64');

    // const response = await fetch(
    //   `${MPESA_API_URL}/oauth/v1/generate?grant_type=client_credentials`,
    //   {
    //     headers: {
    //       Authorization: `Basic ${auth}`,
    //     },
    //   }
    // );

    // const data = await response.json();
    // return data.access_token;
  } catch (error) {
    console.error('[M-Pesa] Token error:', error);
    throw error;
  }
};

/**
 * Process M-Pesa callback (server-side handler)
 * This should be called from your backend
 * @param {Object} callbackData - M-Pesa callback data
 * @returns {Object} Processed result
 */
export const processMpesaCallback = (callbackData) => {
  const {
    Body: { stkCallback },
  } = callbackData;

  const {
    MerchantRequestID,
    CheckoutRequestID,
    ResultCode,
    ResultDesc,
    CallbackMetadata,
  } = stkCallback;

  const transactionData = {
    merchantRequestId: MerchantRequestID,
    checkoutRequestId: CheckoutRequestID,
    resultCode: ResultCode,
    resultDesc: ResultDesc,
    amount: null,
    transactionId: null,
    phoneNumber: null,
    timestamp: null,
  };

  if (ResultCode === 0 && CallbackMetadata) {
    const { Item } = CallbackMetadata;
    Item.forEach(({ Name, Value }) => {
      if (Name === 'Amount') transactionData.amount = Value;
      if (Name === 'MpesaReceiptNumber') transactionData.transactionId = Value;
      if (Name === 'PhoneNumber') transactionData.phoneNumber = Value;
      if (Name === 'TransactionDate') transactionData.timestamp = Value;
    });
  }

  return transactionData;
};

/**
 * Check M-Pesa transaction status
 * @param {string} checkoutRequestId - Checkout request ID
 * @returns {Promise} Transaction status
 */
export const checkTransactionStatus = async (checkoutRequestId) => {
  try {
    // Mock implementation
    console.log('[M-Pesa] Checking status for:', checkoutRequestId);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          ResponseCode: '0',
          ResponseDescription: 'Success',
          MerchantRequestID: checkoutRequestId,
          CheckoutRequestID: checkoutRequestId,
          ResultCode: '0',
          ResultDesc: 'The service request has been accepted successfully',
        });
      }, 1000);
    });

    // Real M-Pesa API call (uncomment for production):
    // const accessToken = await getAccessToken();
    // const timestamp = new Date().toISOString().replace(/[:\-.]/g, '');
    // const password = Buffer.from(
    //   `${MPESA_SHORT_CODE}${MPESA_PASS_KEY}${timestamp}`
    // ).toString('base64');

    // const response = await fetch(
    //   `${MPESA_API_URL}/stkpushquery/v1/query`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       BusinessShortCode: MPESA_SHORT_CODE,
    //       Password: password,
    //       Timestamp: timestamp,
    //       CheckoutRequestID: checkoutRequestId,
    //     }),
    //   }
    // );
    // return response.json();
  } catch (error) {
    console.error('[M-Pesa] Status check error:', error);
    throw error;
  }
};

/**
 * Generate transaction reference
 * @param {string} prefix - Optional prefix
 * @returns {string} Transaction reference
 */
export const generateTransactionRef = (prefix = 'TXN') => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

/**
 * Format phone number for M-Pesa
 * @param {string} phoneNumber - Phone number in any format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  // Remove all non-digit characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // If starts with 0, replace with 254
  if (cleaned.startsWith('0')) {
    return `254${cleaned.slice(1)}`;
  }
  
  // If already has country code
  if (cleaned.startsWith('254')) {
    return cleaned;
  }
  
  // Default: prepend 254
  return `254${cleaned}`;
};

/**
 * Validate M-Pesa phone number
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} Is valid
 */
export const isValidMpesaPhone = (phoneNumber) => {
  const formatted = formatPhoneNumber(phoneNumber);
  // Kenya phone numbers should be 254712... format (12 digits)
  return /^254[1-9]\d{8}$/.test(formatted);
};

/**
 * Mock payment for testing
 * @param {Object} data - Payment data
 * @returns {Promise} Mock payment result
 */
export const mockPayment = async (data) => {
  return new Promise((resolve, reject) => {
    // Simulate random success/failure for testing
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% success rate
      
      if (isSuccess) {
        resolve({
          success: true,
          transactionId: `MOCK_${generateTransactionRef()}`,
          amount: data.amount,
          phoneNumber: data.phoneNumber,
          timestamp: new Date().toISOString(),
          message: 'Mock payment successful',
        });
      } else {
        reject(new Error('Mock payment failed - User cancelled the transaction'));
      }
    }, 2000);
  });
};

export default {
  initiateSTKPush,
  getAccessToken,
  processMpesaCallback,
  checkTransactionStatus,
  generateTransactionRef,
  formatPhoneNumber,
  isValidMpesaPhone,
  mockPayment,
};
