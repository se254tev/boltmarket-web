import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MessageCircle, Plus } from 'lucide-react';
import Chat from '../components/Chat';
import { chatAPI } from '../services/supabase';
import ConversationItem from '../components/ConversationItem';
import ChatDrawer from '../components/ChatDrawer';
import SearchInput from '../components/SearchInput';

// Simple inline message component (replace with toast system if available)
function InlineMessage({ type = 'info', children }){
  const cls = type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
  return <div className={`p-2 rounded text-sm ${cls}`} role="status">{children}</div>;
}

/**
 * Chat Page - Manage conversations with buyers/sellers
 */
export const ChatPage = ({ userId, userName }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [newConversation, setNewConversation] = useState(false);
  const [otherUserId, setOtherUserId] = useState('');
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState(null);
  const [filterText, setFilterText] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const listRef = useRef(null);
  const selectedIndexRef = useRef(0);

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    setIsLoading(true);
    try {
      const resp = await chatAPI.getUserConversations(userId);
      const data = resp.data || [];
      // sort by updated_at desc if not already
      data.sort((a,b)=> new Date(b.updated_at) - new Date(a.updated_at));
      setConversations(data);
      if (data.length > 0) {
        setSelectedConversation(data[0]);
      }
    } catch (error) {
      console.error('Error loading conversations:', error);
      setMessage({ type: 'error', text: 'Failed to load conversations. Please retry.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartConversation = async () => {
    if (!otherUserId) return;
    setCreating(true);
    setMessage(null);
    try{
      // use chatAPI.createConversation (added in services)
      const { data, error } = await chatAPI.createConversation(userId, otherUserId);
      if (error) throw error;
      // prepend to conversations and select
      setConversations(prev => [data, ...prev.filter(c=> c.id !== data.id)]);
      setSelectedConversation(data);
      setOtherUserId('');
      setNewConversation(false);
      setMessage({ type: 'success', text: 'Conversation created.' });
      // open mobile drawer
      setMobileOpen(true);
      // analytics
      if (window?.analytics?.track) window.analytics.track('conversation_started', { with: otherUserId });
    }catch(err){
      console.error('Error creating conversation:', err);
      setMessage({ type: 'error', text: err?.message || 'Unable to create conversation' });
    }finally{
      setCreating(false);
    }
  };

  // Keyboard navigation for conversation list
  const handleListKeyDown = useCallback((e)=>{
    if (!['ArrowUp','ArrowDown','Enter'].includes(e.key)) return;
    e.preventDefault();
    const visible = (conversations || []).filter(c=> (c.participant_1_name||c.participant_2_name||'').toLowerCase().includes(filterText.toLowerCase()));
    if (!visible.length) return;
    if (e.key === 'ArrowDown'){
      selectedIndexRef.current = Math.min(visible.length -1, selectedIndexRef.current + 1);
      setSelectedConversation(visible[selectedIndexRef.current]);
      return;
    }
    if (e.key === 'ArrowUp'){
      selectedIndexRef.current = Math.max(0, selectedIndexRef.current - 1);
      setSelectedConversation(visible[selectedIndexRef.current]);
      return;
    }
    if (e.key === 'Enter'){
      // open mobile drawer if on small screen
      setMobileOpen(true);
    }
  }, [conversations, filterText]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-dark-500 dark:text-dark-400">Loading conversations...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-white dark:bg-dark-900">
      {/* Sidebar - Conversations List */}
      <div className="w-full md:w-80 border-r border-dark-200 dark:border-dark-700 flex flex-col" onKeyDown={handleListKeyDown} ref={listRef} tabIndex={0} aria-label="Conversation list">
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
          {/* Search and New Conversation Form */}
          <div className="space-y-3">
            <SearchInput value={filterText} onChange={(v)=> setFilterText(v)} />
            {newConversation && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={otherUserId}
                  onChange={(e) => setOtherUserId(e.target.value)}
                  placeholder="User ID..."
                  className="input text-sm dark:bg-dark-800 dark:text-white dark:border-dark-600"
                  aria-label="Other user id"
                />
                <button
                  onClick={handleStartConversation}
                  disabled={!otherUserId || creating}
                  className="btn btn-primary btn-sm disabled:opacity-50"
                >
                  {creating ? 'Creating...' : 'Start'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.filter(c=> (c.participant_1_name||c.participant_2_name||'').toLowerCase().includes(filterText.toLowerCase())).length === 0 ? (
            <div className="p-4 text-center text-dark-500 dark:text-dark-400">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No conversations</p>
            </div>
          ) : (
            <div className="space-y-1 p-2" role="list">
              {conversations.filter(c=> (c.participant_1_name||c.participant_2_name||'').toLowerCase().includes(filterText.toLowerCase())).map((conversation, idx) => (
                <div role="listitem" key={conversation.id}>
                  <ConversationItem
                    conversation={conversation}
                    currentUserId={userId}
                    selected={selectedConversation?.id === conversation.id}
                    onClick={()=> { setSelectedConversation(conversation); setMobileOpen(true); if (window?.analytics?.track) window.analytics.track('conversation_selected', { id: conversation.id }); }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chat View for desktop */}
      <div className="hidden md:flex flex-1">
        {selectedConversation ? (
          <Chat
            conversationId={selectedConversation.id}
            currentUserId={userId}
            otherUserName={selectedConversation.participant_1 === userId ? selectedConversation.participant_2_name : selectedConversation.participant_1_name}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-dark-500 dark:text-dark-400">Select a conversation to start chatting</p>
          </div>
        )}
      </div>

      {/* Mobile chat drawer */}
      <ChatDrawer isOpen={mobileOpen} onClose={()=> setMobileOpen(false)} title="Conversation">
        {selectedConversation ? (
          <Chat
            conversationId={selectedConversation.id}
            currentUserId={userId}
            otherUserName={selectedConversation.participant_1 === userId ? selectedConversation.participant_2_name : selectedConversation.participant_1_name}
          />
        ) : (
          <div className="p-4">No conversation selected</div>
        )}
      </ChatDrawer>
    </div>
  );
};

export default ChatPage;
