import React, { useState } from 'react';
import axios from 'axios';

/**
 * PaymentModal - Real MPESA STK Push integration (no mocks)
 */
function PaymentModal({ isOpen, onClose, amount, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleMpesaPayment = async () => {
    try {
      setLoading(true);
      setError("");

      // Call your backend MPESA STK push route
      const res = await axios.post('/api/mpesa/stkpush', {
        amount,
        phone: localStorage.getItem("userPhone") // or from user profile state
      });

      if (res.data.success) {
        onSuccess?.({
          status: 'pending',
          paymentId: res.data.paymentId,
          checkoutId: res.data.checkoutId
        });

        alert("MPESA STK Push sent to your phone. Please enter your PIN to complete payment.");
        onClose?.();
      } else {
        setError(res.data.message || "Failed to initiate MPESA payment.");
      }

    } catch (err) {
      console.error(err);
      setError("An error occurred while initiating the MPESA payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">MPESA Payment</h3>

        <p className="text-sm text-dark-600 mb-4">
          Confirm to proceed with the MPESA STK Push for <strong>KES {amount}</strong>.
        </p>

        {error && (
          <p className="text-red-600 text-sm mb-3">{error}</p>
        )}

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleMpesaPayment}
            className="px-4 py-2 rounded-lg bg-primary-600 text-white"
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay with MPESA"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
