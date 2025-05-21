
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { MessageSquareIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  name: string;
  content: string;
  unread?: boolean;
  time?: string;
}

interface RecentMessagesProps {
  messages: Message[];
}

const RecentMessages = ({ messages }: RecentMessagesProps) => {
  const navigate = useNavigate();
  const unreadCount = messages.filter(message => message.unread).length;

  return (
    <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200">
        <CardTitle className="text-slate-800 flex items-center justify-between">
          <div className="flex items-center">
            <MessageSquareIcon className="mr-2" size={18} />
            Recent Messages
          </div>
          {unreadCount > 0 && (
            <Badge variant="default" className="bg-blue-500 hover:bg-blue-500">
              {unreadCount} new
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3 border-b border-slate-200 pb-2 last:border-0">
              <Avatar className="h-8 w-8 flex-shrink-0">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {message.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-sm text-slate-800">{message.name}</p>
                  {message.time && <span className="text-xs text-slate-500">{message.time}</span>}
                </div>
                <div className="flex items-center">
                  <p className="text-xs text-slate-600 truncate">{message.content}</p>
                  {message.unread && (
                    <span className="ml-2 h-2 w-2 rounded-full bg-blue-500"></span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-white pt-0 px-4 pb-4">
        <Button 
          variant="outline" 
          className="w-full border-slate-200 text-slate-700 hover:bg-slate-50"
          onClick={() => navigate('/messages')}
        >
          View All Messages
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentMessages;
