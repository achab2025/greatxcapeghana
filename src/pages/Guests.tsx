
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white/20 to-gray-100/20 backdrop-blur-sm relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#303307] to-[#45491a] opacity-80 -z-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjNDU0OTFhIiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMzMwIiBjeT0iNDU1IiByPSIyNDAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMTExOCIgY3k9IjI5MSIgcj0iMTcwIi8+PC9nPjwvc3ZnPg==')] bg-cover opacity-10 mix-blend-overlay animate-pulse"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-olive/20 animate-float"
            style={{
              width: `${Math.random() * 25 + 5}px`,
              height: `${Math.random() * 25 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              opacity: Math.random() * 0.6 + 0.2,
              filter: `blur(${Math.random() * 2}px)`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="flex-1 p-8 z-10 text-white">
        <GuestHeader onCreateGuest={handleCreateGuest} />
        
        <div className="animate-fade-in" style={{animationDelay: "0.2s"}}>
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
  );
};

export default Guests;
