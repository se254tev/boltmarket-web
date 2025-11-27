import React from 'react';
import { format } from 'date-fns';

export default function ConversationItem({ conversation, currentUserId, selected, onClick }){
  const otherName = conversation.participant_1 === currentUserId ? conversation.participant_2_name : conversation.participant_1_name;
  const lastMsg = conversation.last_message || conversation.snippet || '';
  const updatedAt = conversation.updated_at ? new Date(conversation.updated_at) : null;
  const unread = conversation.unread_count || 0;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-lg transition-colors flex items-start gap-3 ${selected? 'bg-primary-100 dark:bg-primary-900': 'hover:bg-dark-100 dark:hover:bg-dark-800'}`}
      aria-label={`Conversation with ${otherName}`}
      data-conversation-id={conversation.id}
    >
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="font-medium text-sm text-dark-900 truncate">{otherName || 'Unknown'}</div>
          <div className="text-xs text-dark-500">{updatedAt ? format(updatedAt, 'MMM d') : ''}</div>
        </div>
        <div className="text-xs text-dark-600 truncate mt-1">{lastMsg}</div>
      </div>
      {unread > 0 && (
        <div className="ml-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full" aria-hidden>{unread}</div>
      )}
    </button>
  );
}
