
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquareIcon, UserIcon } from 'lucide-react';

const RecentMessages = () => {
  return (
    <Card className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15 transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquareIcon className="mr-2" size={18} />
          Recent Messages
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-3 border-b border-white/10 pb-2">
            <div className="bg-[#5e6a13]/30 text-white p-2 rounded-full">
              <UserIcon size={16} />
            </div>
            <div>
              <p className="font-medium text-sm text-white">John Smith</p>
              <p className="text-xs text-white/70">Is early check-in possible?</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 border-b border-white/10 pb-2">
            <div className="bg-[#5e6a13]/30 text-white p-2 rounded-full">
              <UserIcon size={16} />
            </div>
            <div>
              <p className="font-medium text-sm text-white">Sarah Johnson</p>
              <p className="text-xs text-white/70">Need extra towels please.</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-[#5e6a13]/30 text-white p-2 rounded-full">
              <UserIcon size={16} />
            </div>
            <div>
              <p className="font-medium text-sm text-white">Alex Lee</p>
              <p className="text-xs text-white/70">Requesting airport shuttle.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentMessages;
