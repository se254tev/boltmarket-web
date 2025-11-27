import React, { useEffect, useState } from 'react';
import { chatAPI } from '../services/supabase';

// MessageInbox
// - Shows conversations for the seller
// - Uses chatAPI to fetch conversations and messages
export default function MessageInbox({ userId }){
  const [conversations, setConversations] = useState([]);
  const [activeConv, setActiveConv] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(()=>{
    if (!userId) return;
    let mounted = true;
    (async ()=>{
      try{
        const { data } = await chatAPI.getUserConversations(userId);
        if (!mounted) return;
        setConversations(data || []);
      }catch(err){ console.error(err); }
    })();
    return ()=> mounted = false;
  }, [userId]);

  useEffect(()=>{
    if (!activeConv) return;
    let mounted = true;
    (async ()=>{
      try{
        const { data } = await chatAPI.getConversationMessages(activeConv.id);
        if (!mounted) return;
        setMessages(data || []);
        // subscribe to new messages
        const sub = chatAPI.subscribeToMessages(activeConv.id, (msg)=>{
          setMessages((m)=>[...m, msg]);
        });
        return ()=> sub?.unsubscribe && sub.unsubscribe();
      }catch(err){ console.error(err); }
    })();
    return ()=> mounted = false;
  }, [activeConv]);

  const send = async ()=>{
    if (!text || !activeConv) return;
    try{
      await chatAPI.sendMessage({ conversation_id: activeConv.id, sender_id: userId, body: text });
      setText('');
    }catch(err){ console.error(err); }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-1">
        <div className="card card-base">
          <h4 className="font-semibold mb-3">Conversations</h4>
          <div className="space-y-2">
            {conversations.map(c => (
              <button key={c.id} onClick={()=> setActiveConv(c)} className={`w-full text-left p-2 rounded ${activeConv?.id===c.id? 'bg-dark-100':''}`}>
                <div className="font-medium">Conversation {c.id}</div>
                <div className="text-xs text-dark-500">Updated: {new Date(c.updated_at).toLocaleString()}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="md:col-span-2">
        <div className="card card-base flex flex-col h-96">
          <div className="flex-1 overflow-auto p-2 space-y-2">
            {messages.map((m, i)=> (
              <div key={i} className={`p-2 rounded ${m.sender_id===userId? 'bg-primary-50 self-end':'bg-dark-100 self-start'}`}>
                <div className="text-sm">{m.body}</div>
                <div className="text-xs text-dark-400">{new Date(m.created_at).toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-2">
            <input className="input flex-1" value={text} onChange={(e)=> setText(e.target.value)} placeholder="Write a reply..." />
            <button onClick={send} className="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
