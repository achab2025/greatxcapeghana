
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Search, Bell } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isAdmin: boolean;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
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

// Mock users - in a real app, these would come from an API
const initialUsers: User[] = [
  {
    id: '1',
    name: 'John Smith',
    avatar: '',
    lastMessage: 'Hi! I have a question about early check-in for my booking next week.',
    lastMessageTime: '2025-05-20T14:35:00Z',
    unreadCount: 0,
    isOnline: true
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    avatar: '',
    lastMessage: 'Is late checkout available?',
    lastMessageTime: '2025-05-20T10:15:00Z',
    unreadCount: 2,
    isOnline: false
  },
  {
    id: '3',
    name: 'Michael Brown',
    avatar: '',
    lastMessage: 'I need to reschedule my booking for June.',
    lastMessageTime: '2025-05-19T16:22:00Z',
    unreadCount: 0,
    isOnline: true
  },
  {
    id: '4',
    name: 'Emily Davis',
    avatar: '',
    lastMessage: 'What amenities are available at the beach house?',
    lastMessageTime: '2025-05-19T09:45:00Z',
    unreadCount: 1,
    isOnline: false
  },
  {
    id: '5',
    name: 'David Wilson',
    avatar: '',
    lastMessage: 'Thanks for your help!',
    lastMessageTime: '2025-05-18T14:30:00Z',
    unreadCount: 0,
    isOnline: false
  }
];

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(users[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const isAdmin = localStorage.getItem("userRole") === "admin";
  
  // Simulate a new message notification
  useEffect(() => {
    if (isAdmin) {
      const notificationTimer = setTimeout(() => {
        // Show a toast notification for a new message
        toast({
          title: "New Message",
          description: "Emily Davis sent you a message",
        });
        
        // Update unread count for a random user
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === '4' ? {...user, unreadCount: user.unreadCount + 1} : user
          )
        );
      }, 15000); // 15 seconds after component mount
      
      return () => clearTimeout(notificationTimer);
    }
  }, [toast, isAdmin]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  // Format timestamp to readable time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Format date for conversation list
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return formatTimestamp(timestamp);
    }
    
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
    
    return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;
    
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
    
    // Update the last message for the selected user
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === selectedUser.id ? {
          ...user, 
          lastMessage: newMessage,
          lastMessageTime: new Date().toISOString(),
          unreadCount: 0
        } : user
      )
    );
    
    // In a real app, you would send this message to your backend service here
    toast({
      description: "Message sent successfully",
    });
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    
    // Mark messages as read when selecting a user
    setUsers(prevUsers => 
      prevUsers.map(u => 
        u.id === user.id ? {...u, unreadCount: 0} : u
      )
    );
    
    // In a real app, you would fetch the conversation history from your backend
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Different view for admin and user
  if (!isAdmin) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="flex-1 p-6 md:p-8 z-10 text-slate-800 flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Support Messages</h1>
            <p className="text-slate-600">Contact our support team for assistance.</p>
            <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mt-4"></div>
          </div>
          
          <div className="flex-1 border border-slate-200 rounded-lg shadow-md flex flex-col overflow-hidden bg-white">
            {/* Messages Header */}
            <div className="bg-slate-50 border-b border-slate-200 p-4">
              <h2 className="font-semibold flex items-center gap-2">
                Property Support Chat
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
  }

  // Admin view with user list
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="flex-1 p-4 z-10 flex flex-col">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-slate-800">Customer Messages</h1>
          <p className="text-slate-600 text-sm">Manage guest inquiries and requests</p>
        </div>
        
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* User List Panel */}
          <div className="w-80 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
            {/* Search Bar */}
            <div className="p-3 border-b border-slate-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input 
                  placeholder="Search conversations..." 
                  className="pl-9 bg-slate-50 border-slate-200"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* User List */}
            <ScrollArea className="flex-1">
              <div className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <div 
                    key={user.id} 
                    className={`p-3 flex gap-3 cursor-pointer hover:bg-slate-50 transition-colors ${selectedUser?.id === user.id ? 'bg-slate-50' : ''}`}
                    onClick={() => handleUserSelect(user)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12 border border-slate-200">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {user.isOnline && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-slate-800 truncate">{user.name}</h3>
                        <span className="text-xs text-slate-500">{formatDate(user.lastMessageTime)}</span>
                      </div>
                      <p className="text-sm text-slate-600 truncate">{user.lastMessage}</p>
                    </div>
                    
                    {user.unreadCount > 0 && (
                      <Badge variant="default" className="bg-blue-500 hover:bg-blue-500 h-5 min-w-5 flex items-center justify-center rounded-full px-1.5">
                        {user.unreadCount}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Chat Panel */}
          <div className="flex-1 bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedUser.avatar} alt={selectedUser.name} />
                      <AvatarFallback className="bg-blue-100 text-blue-600">
                        {selectedUser.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-slate-800">{selectedUser.name}</h3>
                      <p className="text-xs text-slate-500">
                        {selectedUser.isOnline ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="text-slate-500">
                    <Bell className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Chat Messages */}
                <ScrollArea ref={scrollAreaRef} className="flex-1 p-4 bg-slate-50">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.isAdmin ? 'justify-end' : 'justify-start'}`}
                      >
                        {!message.isAdmin && (
                          <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                              {selectedUser.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div 
                          className={`max-w-[75%] rounded-lg p-3 ${
                            message.isAdmin 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-white text-slate-800 border border-slate-200'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <span className={`text-xs block mt-1 ${message.isAdmin ? 'text-blue-100' : 'text-slate-500'}`}>
                            {formatTimestamp(message.timestamp)}
                          </span>
                        </div>
                        {message.isAdmin && (
                          <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                            <AvatarFallback className="bg-slate-300 text-slate-600 text-xs">
                              A
                            </AvatarFallback>
                          </Avatar>
                        )}
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
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <div className="bg-slate-100 p-6 rounded-full mb-3">
                  <svg className="h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-slate-800 mb-2">No conversation selected</h3>
                <p className="text-slate-500 max-w-xs">
                  Choose a conversation from the list to start messaging with a guest
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
