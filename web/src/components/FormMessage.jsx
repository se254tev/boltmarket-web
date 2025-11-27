import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

/**
 * FormMessage - Reusable, accessible form message component
 * Displays success or error messages with appropriate styling and icons
 * 
 * @param {Object} message - Message object { type: 'error' | 'success', text: '...' }
 * @param {React.Ref} ref - Forward ref for focus management
 * @returns {JSX.Element | null}
 */
const FormMessage = React.forwardRef(({ message }, ref) => {
  if (!message) return null;

  const isError = message.type === 'error';
  const isSuccess = message.type === 'success';

  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={`p-3 rounded-lg text-sm flex gap-2 items-start transition-colors ${
        isError
          ? 'bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
          : isSuccess
          ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
          : 'bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
      }`}
      tabIndex={-1}
    >
      {isError ? (
        <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
      ) : (
        <Check className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
      )}
      <p>{message.text}</p>
    </div>
  );
});

FormMessage.displayName = 'FormMessage';

export default FormMessage;
