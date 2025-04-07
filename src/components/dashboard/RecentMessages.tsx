
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquareIcon, UserIcon } from 'lucide-react';

interface Message {
  id: string;
  name: string;
  content: string;
}

interface RecentMessagesProps {
  messages: Message[];
}

const RecentMessages = ({ messages }: RecentMessagesProps) => {
  return (
    <Card className="border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="bg-gradient-to-r from-violet-50 to-purple-50 border-b border-slate-200">
        <CardTitle className="text-violet-700 flex items-center">
          <MessageSquareIcon className="mr-2" size={18} />
          Recent Messages
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-white p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3 border-b border-slate-100 pb-2 last:border-0">
              <div className="bg-violet-100 p-2 rounded-full">
                <UserIcon size={16} className="text-violet-600" />
              </div>
              <div>
                <p className="font-medium text-sm text-slate-800">{message.name}</p>
                <p className="text-xs text-slate-500">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentMessages;
