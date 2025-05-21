
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isAdmin: boolean;
}

// Mock initial messages - in a real app, these would come from an API
const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'Admin',
    content: 'Welcome to our vacation rental service! How can I help you today?',
    timestamp: '2025-05-20T14:30:00Z',
    isAdmin: true
  },
  {
    id: '2',
    sender: 'Guest',
    content: 'Hi! I have a question about early check-in for my booking next week.',
    timestamp: '2025-05-20T14:35:00Z',
    isAdmin: false
  },
  {
    id: '3',
    sender: 'Admin',
    content: 'Of course! I\'d be happy to check if early check-in is available for your booking. Could you please provide your booking reference?',
    timestamp: '2025-05-20T14:38:00Z',
    isAdmin: true
  }
];

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isAdmin = localStorage.getItem("userRole") === "admin";
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const currentUser = isAdmin ? "Admin" : "Guest";
    
    const newMessageObj: Message = {
      id: Date.now().toString(),
      sender: currentUser,
      content: newMessage,
      timestamp: new Date().toISOString(),
      isAdmin: isAdmin
    };
    
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
    
    // In a real app, you would send this message to your backend service here
    toast({
      description: "Message sent successfully",
    });
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative">
      <div className="flex-1 p-6 md:p-8 z-10 text-slate-800 flex flex-col">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">{isAdmin ? "Customer Messages" : "Support Messages"}</h1>
          <p className="text-slate-600">{isAdmin ? "Respond to guest inquiries and requests." : "Contact our support team for assistance."}</p>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-4"></div>
        </div>
        
        <div className="flex-1 border border-slate-200 rounded-lg shadow-md flex flex-col overflow-hidden bg-white">
          {/* Messages Header */}
          <div className="bg-slate-50 border-b border-slate-200 p-4">
            <h2 className="font-semibold flex items-center gap-2">
              {isAdmin ? "Guest Support Chat" : "Property Support Chat"}
            </h2>
          </div>
          
          {/* Messages Content */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.isAdmin === isAdmin ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[75%] rounded-lg p-3 ${
                      message.isAdmin === isAdmin 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-slate-100 text-slate-800 border border-slate-200'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className={`text-xs block mt-1 ${message.isAdmin === isAdmin ? 'text-blue-100' : 'text-slate-500'}`}>
                      {formatTimestamp(message.timestamp)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Message Input */}
          <div className="border-t border-slate-200 p-4 flex gap-2">
            <Textarea
              placeholder="Type your message..."
              className="resize-none flex-1"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Button 
              className="bg-blue-500 hover:bg-blue-600" 
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
