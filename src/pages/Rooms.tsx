
import React from 'react';

const Rooms = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-olive-light/10 to-olive/10 relative">
      <div className="flex-1 p-8 z-10 text-olive-dark">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Room & Pricing Management</h1>
          <p className="text-olive-dark/70">Manage your room inventory and pricing strategy.</p>
          <div className="h-1 w-20 bg-gradient-to-r from-olive to-olive-light rounded-full mt-4"></div>
        </div>
        
        <div className="border border-olive/20 rounded-lg p-8 text-center bg-white shadow-md">
          <h2 className="text-xl font-semibold text-olive-dark">Room Management Content</h2>
          <p className="text-olive-dark/70">This page is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
