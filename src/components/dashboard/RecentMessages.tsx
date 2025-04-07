
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
    <Card className="border shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquareIcon className="mr-2" size={18} />
          Recent Messages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-3 border-b border-gray-100 pb-2 last:border-0">
              <div className="bg-primary/10 p-2 rounded-full">
                <UserIcon size={16} className="text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">{message.name}</p>
                <p className="text-xs text-muted-foreground">{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentMessages;
