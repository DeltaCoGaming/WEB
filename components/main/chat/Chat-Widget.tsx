// app/components/Chat/Widget.tsx

'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, X, Send, User, Bot, Crosshair, Clock, Map } from 'lucide-react';

type Message = {
  text: string;
  isUser: boolean;
};

type Server = 'zeus' | 'lib' | 'sog';

const serverInfo: Record<Server, string> = {
  zeus: "Our Zeus Ops Server offers dynamic, mission-based gameplay crafted by skilled Game Masters.",
  lib: "The Liberation 24/7 Server lets you engage in a persistent, open-world campaign to liberate Altis.",
  sog: "Step into the Vietnam War era with our SOG Prairie Fire 24/7 Server for authentic gameplay and missions.",
};

const ChatMessage = ({ message, isUser }: { message: string; isUser: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
  >
    <div className={`flex items-start max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`p-2 rounded-full ${isUser ? 'bg-[#d6c8a6]' : 'bg-[#2a2a2a]'} mr-2`}>
        {isUser ? <User className="h-4 w-4 text-black" /> : <Bot className="h-4 w-4 text-[#d6c8a6]" />}
      </div>
      <div className={`p-3 rounded-lg ${isUser ? 'bg-[#d6c8a6] text-black' : 'bg-[#2a2a2a] text-white'}`}>
        {message}
      </div>
    </div>
  </motion.div>
);

const ServerButton = ({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) => (
  <Button
    variant="outline"
    className="flex items-center justify-center p-2 bg-[#2a2a2a] hover:bg-[#3a3a3a] border-[#d6c8a6] text-[#d6c8a6]"
    onClick={onClick}
  >
    {icon}
    <span className="ml-2 text-xs">{label}</span>
  </Button>
);

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      handleSendMessage("Hello", true);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (text: string, isInitial: boolean = false) => {
    if (text.trim()) {
      if (!isInitial) {
        setMessages(prev => [...prev, { text, isUser: true }]);
      }
      setMessage('');

      try {
        const response = await fetch('http://0.0.0.0:55003/v2/chatme/ask', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: text,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setMessages(prev => [...prev, { text: data.answer, isUser: false }]);
      } catch (error) {
        console.error('Error:', error);
        setMessages(prev => [...prev, { text: "Sorry, I'm having trouble connecting right now. Please try again later.", isUser: false }]);
      }
    }
  };

  const handleServerInfo = (server: Server) => {
    setMessages(prev => [...prev, { text: serverInfo[server], isUser: false }]);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-20 right-4 w-96 h-[32rem] bg-[#1a1a1a] border border-[#d6c8a6] rounded-lg shadow-lg overflow-hidden"
          >
            <div className="flex justify-between items-center bg-[#d6c8a6] text-black p-3">
              <h3 className="font-bold">Delta CO Command Center</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-[calc(100%-11rem)] p-4" ref={scrollAreaRef}>
              {messages.map((msg, index) => (
                <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
              ))}
            </ScrollArea>
            <div className="p-3 bg-[#2a2a2a]">
              <div className="flex space-x-2 mb-2">
                <ServerButton icon={<Crosshair className="h-4 w-4" />} label="Zeus" onClick={() => handleServerInfo('zeus')} />
                <ServerButton icon={<Clock className="h-4 w-4" />} label="Liberation" onClick={() => handleServerInfo('lib')} />
                <ServerButton icon={<Map className="h-4 w-4" />} label="SOG" onClick={() => handleServerInfo('sog')} />
              </div>
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Type your message, soldier..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-grow mr-2 bg-[#2a2a2a] text-white border-[#d6c8a6] placeholder-[#a0a0a0] text-[16px]"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(message)}
                />
                <Button 
                  onClick={() => handleSendMessage(message)} 
                  className="bg-[#d6c8a6] text-black hover:bg-[#f0e6ce] min-w-[40px] flex items-center justify-center"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 rounded-full w-14 h-14 bg-[#d6c8a6] text-black hover:bg-[#f0e6ce]"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>
    </>
  );
};

export default ChatWidget;