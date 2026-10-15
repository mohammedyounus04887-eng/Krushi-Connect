'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, User, CheckCheck, ArrowLeft } from 'lucide-react';
import { useApp } from '@/lib/context';
import Link from 'next/link';

export default function MessagesPage() {
  const { currentUser, messages, sendMessage, users } = useApp();
  
  const [selectedUserId, setSelectedUserId] = useState<string>(
    users.find(u => u.id !== currentUser.id)?.id || 'usr_2'
  );

  const [inputContent, setInputContent] = useState('');

  const peers = users.filter(user => user.id !== currentUser.id);
  const activePeer = peers.find(user => user.id === selectedUserId) || peers[0];

  const conversationMessages = messages.filter(
    m => (m.senderId === currentUser.id && m.receiverId === activePeer?.id) ||
         (m.senderId === activePeer?.id && m.receiverId === currentUser.id)
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim() || !activePeer) return;
    sendMessage(activePeer.id, activePeer.name, inputContent);
    setInputContent('');
  };

  if (!activePeer) return <div className="status-page"><h1>More connections<br />are on their way.</h1><p>Your conversations will appear here when another contact is available.</p></div>;

  return (
    <div className="space-y-6 py-2 text-agri-950">
      
      {/* Header */}
      <div className="flex items-center justify-between glass-panel p-5 rounded-2xl border border-agri-300 bg-white/95 shadow-sm text-agri-950">
        <div className="flex items-center space-x-3">
          <Link href="/dashboard" className="p-2 rounded-xl bg-agri-100 border border-agri-300 text-agri-900 hover:bg-agri-200 transition-colors">
            <ArrowLeft className="w-4 h-4 text-agri-800" />
          </Link>
          <div>
            <h1 className="text-xl font-black text-agri-950 flex items-center gap-2">
              Good conversations.
            </h1>
            <p className="text-xs text-agri-700 font-medium">Direct communications between Farmers, Landowners, Workers & Buyers.</p>
          </div>
        </div>
      </div>

      {/* Main Messaging Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-[580px] bg-white rounded-3xl border border-agri-300 overflow-hidden shadow-sm text-agri-950">
        
        {/* Left Peer Contacts List */}
        <div className="lg:col-span-4 border-r border-agri-200 p-4 space-y-3 overflow-y-auto bg-agri-50/50">
          <p className="text-[10px] font-black uppercase tracking-wider text-agri-700 font-mono px-2">Ecosystem Contacts</p>

          <div className="space-y-1.5">
            {peers.map(u => (
              <button
                key={u.id}
                onClick={() => setSelectedUserId(u.id)}
                className={`w-full text-left p-3 rounded-2xl flex items-center space-x-3 transition-all ${
                  activePeer.id === u.id
                    ? 'bg-agri-600 text-white shadow-sm font-bold'
                    : 'hover:bg-agri-100/70 text-agri-950 font-medium'
                }`}
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-agri-100 border border-agri-300 shrink-0">
                  <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                </div>
                <div className="truncate">
                  <p className="font-extrabold text-xs truncate">{u.name}</p>
                  <p className={`text-[10px] capitalize ${activePeer.id === u.id ? 'text-emerald-100' : 'text-agri-700'}`}>{u.role} • {u.location}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Active Conversation Window */}
        <div className="lg:col-span-8 flex flex-col justify-between p-4 bg-white">
          
          {/* Active Contact Bar */}
          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-center space-x-3 mb-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-amber-300 shrink-0">
              <img src={activePeer.avatar} alt={activePeer.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-black text-agri-950 text-sm">{activePeer.name}</h3>
              <p className="text-[10px] text-amber-800 font-bold capitalize">Role: {activePeer.role} • Verified User</p>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto space-y-3 p-2">
            {conversationMessages.length === 0 ? (
              <div className="text-center py-20 space-y-2 text-agri-700 font-medium text-xs">
                <MessageSquare className="w-8 h-8 text-agri-400 mx-auto" />
                <p>No messages yet. Send a direct enquiry to start conversation.</p>
              </div>
            ) : (
              conversationMessages.map(msg => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-xs md:max-w-md p-3.5 rounded-2xl text-xs space-y-1 ${
                        isMe
                          ? 'bg-agri-600 text-white font-semibold shadow-sm'
                          : 'bg-agri-50 border border-agri-200 text-agri-950 font-medium'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <div className="flex items-center justify-end space-x-1 text-[9px] opacity-80">
                        <span>{msg.timestamp}</span>
                        {isMe && <CheckCheck className="w-3 h-3 text-amber-300" />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSend} className="mt-3 flex items-center space-x-2">
            <input
              type="text"
              aria-label={`Message ${activePeer.name}`}
              placeholder={`Message ${activePeer.name}...`}
              value={inputContent}
              onChange={e => setInputContent(e.target.value)}
              className="flex-1 bg-white border border-agri-300 rounded-xl px-4 py-2.5 text-xs text-agri-950 font-medium focus:outline-none focus:border-agri-600 focus:ring-2 focus:ring-amber-300/40"
            />
            <button
              type="submit"
              disabled={!inputContent.trim()}
              className="px-4 py-2.5 rounded-xl bg-agri-600 text-white font-extrabold text-xs hover:bg-agri-500 transition-colors flex items-center space-x-1 shadow-sm"
            >
              <Send className="w-4 h-4 text-amber-300" />
              <span>Send</span>
            </button>
          </form>

        </div>

      </div>

    </div>
  );
}
