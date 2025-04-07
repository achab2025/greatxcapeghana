
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-olive-light/10 to-olive/10 relative">
      <div className="flex-1 p-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div>
            <GuestHeader onCreateGuest={handleCreateGuest} />
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-olive/10 p-6 mt-8">
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
