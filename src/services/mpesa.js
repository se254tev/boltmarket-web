// M-Pesa payment integration service
// This module forwards requests to the backend MPESA endpoints.
import apiClient from './api';

/**
 * M-Pesa STK Push - Initiate payment prompt on user's phone
 * @param {Object} data - Payment data
 * @returns {Promise} Payment initiation response
 */
export const initiateSTKPush = async (data) => {
  try {
    const resp = await apiClient.post('/mpesa/stkpush', data);
    return resp.data;
  } catch (err) {
    console.error('[M-Pesa] STK Push error:', err);
    throw err;
  }
};

/**
 * Get M-Pesa access token
 * @returns {Promise<string>} Access token
 */
export const getAccessToken = async () => {
  // Access token is handled server-side; frontend should not request it directly.
  throw new Error('Access token must be requested from backend');
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
    const resp = await apiClient.post('/mpesa/status', { checkoutRequestId });
    return resp.data;
  } catch (err) {
    console.error('[M-Pesa] Status check error:', err);
    throw err;
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
export default {
  initiateSTKPush,
  processMpesaCallback,
  checkTransactionStatus,
  generateTransactionRef,
  formatPhoneNumber,
  isValidMpesaPhone,
};
