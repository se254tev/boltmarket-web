/**
 * Escrow transaction management
 * Handles secure transactions between buyers and sellers
 */

import { escrowAPI, paymentsAPI } from './supabase';

export const ESCROW_STATUS = {
  PENDING: 'pending',
  PAYMENT_RECEIVED: 'payment_received',
  GOODS_SHIPPED: 'goods_shipped',
  GOODS_RECEIVED: 'goods_received',
  COMPLETED: 'completed',
  DISPUTED: 'disputed',
  REFUNDED: 'refunded',
  CANCELLED: 'cancelled',
};

export const ESCROW_TIMELINE = {
  [ESCROW_STATUS.PENDING]: 'Waiting for payment',
  [ESCROW_STATUS.PAYMENT_RECEIVED]: 'Payment received, awaiting shipment',
  [ESCROW_STATUS.GOODS_SHIPPED]: 'Goods shipped, in transit',
  [ESCROW_STATUS.GOODS_RECEIVED]: 'Goods received, awaiting confirmation',
  [ESCROW_STATUS.COMPLETED]: 'Transaction completed',
  [ESCROW_STATUS.DISPUTED]: 'Dispute in progress',
  [ESCROW_STATUS.REFUNDED]: 'Refund processed',
  [ESCROW_STATUS.CANCELLED]: 'Transaction cancelled',
};

/**
 * Create new escrow transaction
 */
export const createEscrow = async (data) => {
  const {
    listing_id,
    buyer_id,
    seller_id,
    amount,
    currency = 'KES',
  } = data;

  try {
    const { data: escrow, error } = await escrowAPI.createEscrow({
      listing_id,
      buyer_id,
      seller_id,
      amount,
      currency,
      status: ESCROW_STATUS.PENDING,
    });

    if (error) throw error;
    return escrow[0];
  } catch (error) {
    console.error('Error creating escrow:', error);
    throw error;
  }
};

/**
 * Process payment for escrow
 */
export const processEscrowPayment = async (escrowId, paymentData) => {
  try {
    // Create payment record
    const { data: payment, error: paymentError } = await paymentsAPI.createPayment({
      escrow_id: escrowId,
      ...paymentData,
      status: 'completed',
    });

    if (paymentError) throw paymentError;

    // Update escrow status
    const { data: updatedEscrow, error: escrowError } = await escrowAPI.updateEscrowStatus(
      escrowId,
      ESCROW_STATUS.PAYMENT_RECEIVED
    );

    if (escrowError) throw escrowError;

    return {
      escrow: updatedEscrow[0],
      payment: payment[0],
    };
  } catch (error) {
    console.error('Error processing payment:', error);
    throw error;
  }
};

/**
 * Confirm goods shipped
 */
export const confirmGoodsShipped = async (escrowId, shippingData) => {
  try {
    const { data: escrow, error } = await escrowAPI.updateEscrowStatus(
      escrowId,
      ESCROW_STATUS.GOODS_SHIPPED
    );

    if (error) throw error;

    // Store shipping info
    if (shippingData) {
      // Store tracking number, carrier, etc in a shipping table
      console.log('Shipping data recorded:', shippingData);
    }

    return escrow[0];
  } catch (error) {
    console.error('Error confirming shipment:', error);
    throw error;
  }
};

/**
 * Confirm goods received
 */
export const confirmGoodsReceived = async (escrowId) => {
  try {
    const { data: escrow, error } = await escrowAPI.updateEscrowStatus(
      escrowId,
      ESCROW_STATUS.GOODS_RECEIVED
    );

    if (error) throw error;
    return escrow[0];
  } catch (error) {
    console.error('Error confirming receipt:', error);
    throw error;
  }
};

/**
 * Release escrow (complete transaction)
 */
export const releaseEscrow = async (escrowId) => {
  try {
    const { data: escrow, error } = await escrowAPI.updateEscrowStatus(
      escrowId,
      ESCROW_STATUS.COMPLETED
    );

    if (error) throw error;

    // In a real system, this would trigger payment to seller
    console.log('Escrow released to seller');

    return escrow[0];
  } catch (error) {
    console.error('Error releasing escrow:', error);
    throw error;
  }
};

/**
 * Refund escrow
 */
export const refundEscrow = async (escrowId, reason) => {
  try {
    const { data: escrow, error } = await escrowAPI.updateEscrowStatus(
      escrowId,
      ESCROW_STATUS.REFUNDED
    );

    if (error) throw error;

    // In a real system, this would trigger refund to buyer
    console.log('Escrow refunded to buyer. Reason:', reason);

    return escrow[0];
  } catch (error) {
    console.error('Error refunding escrow:', error);
    throw error;
  }
};

/**
 * Dispute escrow transaction
 */
export const disputeEscrow = async (escrowId, reason) => {
  try {
    const { data: escrow, error } = await escrowAPI.updateEscrowStatus(
      escrowId,
      ESCROW_STATUS.DISPUTED
    );

    if (error) throw error;

    // Create dispute record
    console.log('Dispute created for escrow. Reason:', reason);

    return escrow[0];
  } catch (error) {
    console.error('Error disputing escrow:', error);
    throw error;
  }
};

/**
 * Get escrow transaction details
 */
export const getEscrowDetails = async (escrowId) => {
  try {
    const { data: escrow, error } = await escrowAPI.getEscrow(escrowId);
    if (error) throw error;
    return escrow;
  } catch (error) {
    console.error('Error fetching escrow:', error);
    throw error;
  }
};

/**
 * Get user's escrow transactions
 */
export const getUserEscrows = async (userId) => {
  try {
    const { data: escrows, error } = await escrowAPI.getUserEscrows(userId);
    if (error) throw error;
    return escrows || [];
  } catch (error) {
    console.error('Error fetching user escrows:', error);
    throw error;
  }
};

/**
 * Calculate transaction fee
 */
export const calculateTransactionFee = (amount, feePercentage = 2.5) => {
  return (amount * feePercentage) / 100;
};

/**
 * Get estimated completion time
 */
export const getEstimatedCompletionTime = () => {
  // Add 7 days for typical transaction (buyer receives goods and confirms)
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
};

export default {
  createEscrow,
  processEscrowPayment,
  confirmGoodsShipped,
  confirmGoodsReceived,
  releaseEscrow,
  refundEscrow,
  disputeEscrow,
  getEscrowDetails,
  getUserEscrows,
  calculateTransactionFee,
  getEstimatedCompletionTime,
  ESCROW_STATUS,
  ESCROW_TIMELINE,
};
