
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { MessageSquareIcon, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  name: string;
  content: string;
}

interface RecentMessagesProps {
  messages: Message[];
}

const RecentMessages = ({ messages }: RecentMessagesProps) => {
  const navigate = useNavigate();

  return (
    <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-slate-100 to-slate-50 border-b border-slate-200">
        <CardTitle className="text-slate-800 flex items-center">
          <MessageSquareIcon className="mr-2" size={18} />
          Recent Messages
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3 border-b border-slate-200 pb-2 last:border-0">
              <div className="bg-slate-100 p-2 rounded-full">
                <UserIcon size={16} className="text-slate-700" />
              </div>
              <div>
                <p className="font-medium text-sm text-slate-800">{message.name}</p>
                <p className="text-xs text-slate-600">{message.content}</p>
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
