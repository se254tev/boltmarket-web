import React, { useState, useEffect, useRef } from 'react';
import { Send, Loader } from 'lucide-react';
import { chatAPI } from '../services/supabase';

/**
 * Real-time Chat Component
 * Enables buyer-seller communication with Supabase Realtime
 */
export const Chat = ({ conversationId, currentUserId, otherUserName }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const subscriptionRef = useRef(null);

  // Load initial messages
  useEffect(() => {
    loadMessages();
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [conversationId]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /**
   * Load conversation messages
   */
  const loadMessages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await chatAPI.getConversationMessages(conversationId);
      
      if (error) throw error;
      
      setMessages(data || []);

      // Subscribe to new messages
      const subscription = chatAPI.subscribeToMessages(
        conversationId,
        (newMsg) => {
          setMessages((prev) => {
            // Avoid duplicates
            if (prev.some((m) => m.id === newMsg.id)) {
              return prev;
            }
            return [...prev, newMsg];
          });
        }
      );

      subscriptionRef.current = subscription;
    } catch (error) {
      console.error('Error loading messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Send message
   */
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    setIsSending(true);
    try {
      const { data, error } = await chatAPI.sendMessage({
        conversation_id: conversationId,
        sender_id: currentUserId,
        text: newMessage,
      });

      if (error) throw error;

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="w-6 h-6 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen dark:bg-dark-900 bg-white">
      {/* Header */}
      <div className="p-4 border-b border-dark-200 dark:border-dark-700">
        <h3 className="font-semibold text-dark-900 dark:text-white">
          {otherUserName}
        </h3>
        <p className="text-xs text-dark-500 dark:text-dark-400">Chat</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-dark-500 dark:text-dark-400">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender_id === currentUserId
                  ? 'justify-end'
                  : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.sender_id === currentUserId
                    ? 'bg-primary-500 text-white rounded-br-none'
                    : 'bg-dark-100 dark:bg-dark-700 text-dark-900 dark:text-white rounded-bl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender_id === currentUserId
                      ? 'text-primary-100'
                      : 'text-dark-500 dark:text-dark-400'
                  }`}
                >
                  {new Date(message.created_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-dark-200 dark:border-dark-700"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            disabled={isSending}
            className="input flex-1 dark:bg-dark-800 dark:text-white dark:border-dark-600"
          />
          <button
            type="submit"
            disabled={isSending || !newMessage.trim()}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <Loader className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
