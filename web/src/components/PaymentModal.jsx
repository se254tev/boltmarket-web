import React from 'react';

/**
 * PaymentModal - simple MPESA placeholder
 */
function PaymentModal({ isOpen, onClose, amount, onSuccess }) {
  if (!isOpen) return null;

  const handleMpesa = () => {
    // Stub: simulate MPESA flow
    setTimeout(() => {
      alert(`MPESA payment of KES ${amount} simulated (stub).`);
      onSuccess && onSuccess({ status: 'success', amount });
      onClose && onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-semibold mb-4">MPESA Payment</h3>
        <p className="text-sm text-dark-600 mb-4">You will be redirected to MPESA to complete the payment of <strong>KES {amount}</strong>.</p>
        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border">Cancel</button>
          <button onClick={handleMpesa} className="px-4 py-2 rounded-lg bg-primary-600 text-white">Pay with MPESA</button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;
