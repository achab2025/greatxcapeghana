
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';

const Reports = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">View detailed reports and analytics of your business.</p>
        </div>
        
        <div className="border rounded-lg p-8 text-center animate-fade-in">
          <h2 className="text-xl font-semibold text-muted-foreground">Reports & Analytics Content</h2>
          <p>This page is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
