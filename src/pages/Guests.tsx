
import React from 'react';
import Sidebar from '@/components/layout/Sidebar';
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
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <GuestHeader onCreateGuest={handleCreateGuest} />
        
        <GuestTable 
          guests={guestsList}
          onViewGuest={handleViewGuest}
          onEditGuest={handleEditGuest}
          onDeleteGuest={handleDeleteGuest}
          onViewBookingHistory={handleViewBookingHistory}
        />
        
        <GuestFormDialog
          isOpen={isFormOpen}
          onOpenChange={setIsFormOpen}
          guest={currentGuest}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </div>
    </div>
  );
};

export default Guests;
