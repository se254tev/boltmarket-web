import React from 'react';

/**
 * Modal Component
 * Reusable modal/dialog component for forms and confirmations
 * @param {boolean} isOpen - Control modal visibility
 * @param {Function} onClose - Callback to close modal
 * @param {string} title - Modal title
 * @param {ReactNode} children - Modal content
 * @param {boolean} showFooter - Show default footer buttons
 * @param {Function} onConfirm - Callback for confirm action
 * @param {string} confirmText - Confirm button text
 */
function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  showFooter = true, 
  onConfirm, 
  confirmText = 'Confirm',
  isDangerous = false 
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-slideUp">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-dark-100">
          <h2 className="text-xl font-bold text-dark-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-dark-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        {showFooter && (
          <div className="flex gap-3 p-6 border-t border-dark-100 bg-dark-50">
            <button 
              onClick={onClose}
              className="btn btn-secondary flex-1"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm}
              className={`btn flex-1 ${isDangerous ? 'bg-red-600 text-white hover:bg-red-700' : 'btn-primary'}`}
            >
              {confirmText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modal;
