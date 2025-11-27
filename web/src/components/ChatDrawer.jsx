import React from 'react';

export default function ChatDrawer({ isOpen, onClose, children, title = 'Chat' }){
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="fixed inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <aside className="ml-auto w-full max-w-md bg-white dark:bg-dark-900 h-full shadow-lg p-4 overflow-auto" role="dialog" aria-modal="true" aria-label={title}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">{title}</h3>
          <button onClick={onClose} className="btn btn-ghost">Close</button>
        </div>
        {children}
      </aside>
    </div>
  );
}
