import React, { useState, useEffect } from 'react';
import { MessageCircle, Plus } from 'lucide-react';
import Chat from '../components/Chat';
import { chatAPI } from '../services/supabase';

/**
 * Chat Page - Manage conversations with buyers/sellers
 */
export const ChatPage = ({ userId, userName }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newConversation, setNewConversation] = useState(false);
  const [otherUserId, setOtherUserId] = useState('');

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await chatAPI.getUserConversations(userId);
      if (!error) {
        setConversations(data || []);
        if (data?.length > 0) {
          setSelectedConversation(data[0]);
        }
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartConversation = async () => {
    if (!otherUserId) return;

    try {
      const { data, error } = await chatAPI.getOrCreateConversation(
        userId,
        otherUserId
      );

      if (!error) {
        setConversations((prev) => [data, ...prev]);
        setSelectedConversation(data);
        setNewConversation(false);
        setOtherUserId('');
      }
    } catch (error) {
      console.error('Error creating conversation:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-dark-500 dark:text-dark-400">Loading chats...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white dark:bg-dark-900">
      {/* Sidebar - Conversations List */}
      <div className="w-full md:w-80 border-r border-dark-200 dark:border-dark-700 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-dark-200 dark:border-dark-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-dark-900 dark:text-white">
              Messages
            </h2>
            <button
              onClick={() => setNewConversation(!newConversation)}
              className="p-2 hover:bg-dark-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5 text-primary-500" />
            </button>
          </div>

          {/* New Conversation Form */}
          {newConversation && (
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={otherUserId}
                onChange={(e) => setOtherUserId(e.target.value)}
                placeholder="User ID..."
                className="input text-sm dark:bg-dark-800 dark:text-white dark:border-dark-600"
              />
              <button
                onClick={handleStartConversation}
                disabled={!otherUserId}
                className="btn btn-primary btn-sm disabled:opacity-50"
              >
                Start
              </button>
            </div>
          )}
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-dark-500 dark:text-dark-400">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No conversations yet</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {conversations.map((conversation) => {
                const otherUserName =
                  conversation.participant_1 === userId
                    ? conversation.participant_2_name
                    : conversation.participant_1_name;

                return (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedConversation?.id === conversation.id
                        ? 'bg-primary-100 dark:bg-primary-900'
                        : 'hover:bg-dark-100 dark:hover:bg-dark-800'
                    }`}
                  >
                    <p className="text-sm font-medium text-dark-900 dark:text-white truncate">
                      {otherUserName || 'Unknown User'}
                    </p>
                    <p className="text-xs text-dark-500 dark:text-dark-400">
                      {new Date(conversation.updated_at).toLocaleDateString()}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Chat View */}
      <div className="hidden md:flex flex-1">
        {selectedConversation ? (
          <Chat
            conversationId={selectedConversation.id}
            currentUserId={userId}
            otherUserName={
              selectedConversation.participant_1 === userId
                ? selectedConversation.participant_2_name
                : selectedConversation.participant_1_name
            }
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-dark-500 dark:text-dark-400">
              Select a conversation to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
