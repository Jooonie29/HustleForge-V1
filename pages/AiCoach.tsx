import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { ChatMessage, PersonaContent } from '../types';
import { Send, Bot, User as UserIcon, Loader2, Flame } from 'lucide-react';
import { createChatSession, sendMessageToAi } from '../services/geminiService';
import { Chat } from "@google/genai";

interface AiCoachProps {
  persona: PersonaContent;
  userTitle: string;
}

export const AiCoach: React.FC<AiCoachProps> = ({ persona, userTitle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatSessionRef.current = createChatSession(persona.aiSystemInstruction);
    setMessages([{
      id: '0',
      role: 'model',
      text: `Greetings, ${userTitle}. I am ready to assist with your ${persona.type} strategy. What is the objective today?`,
      timestamp: new Date()
    }]);
  }, [persona, userTitle]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim() || !chatSessionRef.current) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToAi(chatSessionRef.current, userMsg.text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Failed to get response", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100dvh-12rem)] md:h-[calc(100vh-8rem)] max-w-4xl mx-auto flex flex-col gap-4 animate-fade-in relative">
      <div className="text-center mb-2 md:mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white font-header uppercase tracking-tighter">Kade</h2>
        <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">Provides financial guidance and emotional support during challenges.</p>
      </div>

      <Card className="flex-1 flex flex-col p-0 overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 md:space-y-8">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`
                w-8 h-8 md:w-10 md:h-10 rounded-sm flex items-center justify-center flex-shrink-0 shadow-lg
                ${msg.role === 'user' ? 'bg-zinc-800 border border-zinc-700' : 'bg-forge-red text-white'}
              `}>
                {msg.role === 'user' ? <UserIcon size={16} className="text-gray-300" /> : <Flame size={16} fill="currentColor" />}
              </div>
              
              <div className={`
                max-w-[85%] md:max-w-[80%] p-4 md:p-5 rounded-sm text-sm leading-relaxed shadow-lg
                ${msg.role === 'user' 
                  ? 'bg-zinc-800 text-gray-100 border border-zinc-700' 
                  : 'bg-zinc-950 text-gray-300 border border-zinc-800'}
              `}>
                <div className="font-header font-bold uppercase text-[10px] md:text-xs tracking-widest mb-2 opacity-50">
                   {msg.role === 'user' ? userTitle : 'Kade'}
                </div>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 animate-pulse">
               <div className="w-8 h-8 md:w-10 md:h-10 rounded-sm bg-forge-red text-white flex items-center justify-center">
                  <Flame size={16} fill="currentColor" />
               </div>
               <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-sm flex items-center gap-3 text-gray-500 text-sm font-mono">
                  <Loader2 size={16} className="animate-spin text-forge-red" />
                  <span>CALCULATING STRATEGY...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 md:p-4 bg-zinc-950 border-t border-zinc-800 flex gap-2 md:gap-3">
          <input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Enter command..."
            className="flex-1 bg-zinc-900 border border-zinc-800 rounded-sm px-4 py-3 md:py-4 text-white placeholder-zinc-600 focus:outline-none focus:border-forge-red focus:ring-1 focus:ring-forge-red transition-all font-mono text-sm"
          />
          <Button onClick={handleSend} disabled={isLoading} className="px-4 md:px-8 rounded-sm">
            <Send size={18} />
          </Button>
        </div>
      </Card>
    </div>
  );
};