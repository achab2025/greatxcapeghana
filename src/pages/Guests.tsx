
import React from 'react';
import GuestTable from '@/components/guests/GuestTable';
import GuestHeader from '@/components/guests/GuestHeader';
import GuestFormDialog from '@/components/guests/GuestFormDialog';
import { useGuestManagement } from '@/components/guests/hooks/useGuestManagement';

const Guests = () => {
  const { 
    guestsList,
    isFormOpen,
    currentGuest,
    setIsFormOpen,
    handleViewGuest,
    handleEditGuest,
    handleDeleteGuest,
    handleViewBookingHistory,
    handleCreateGuest,
    handleFormSubmit,
    handleFormCancel
  } = useGuestManagement();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
      
      <div className="flex-1 p-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="animate-fade-down" style={{animationDelay: "0.1s"}}>
            <GuestHeader onCreateGuest={handleCreateGuest} />
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 mt-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
            <GuestTable 
              guests={guestsList}
              onViewGuest={handleViewGuest}
              onEditGuest={handleEditGuest}
              onDeleteGuest={handleDeleteGuest}
              onViewBookingHistory={handleViewBookingHistory}
            />
          </div>
          
          <GuestFormDialog
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
            guest={currentGuest}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default Guests;
