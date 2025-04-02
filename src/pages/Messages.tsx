
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';

const Messages = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold">Messages & Inquiries</h1>
          <p className="text-muted-foreground">Manage customer messages and inquiries.</p>
        </div>
        
        <div className="border rounded-lg p-8 text-center animate-fade-in">
          <h2 className="text-xl font-semibold text-muted-foreground">Messages & Inquiries Content</h2>
          <p>This page is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default Messages;
