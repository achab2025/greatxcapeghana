
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import GuestTable from '@/components/guests/GuestTable';
import GuestForm from '@/components/guests/GuestForm';
import { guests, bookings } from '@/data/mockData';
import { Guest } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';

const Guests = () => {
  const [guestsList, setGuestsList] = useState<Guest[]>(guests);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentGuest, setCurrentGuest] = useState<Guest | undefined>(undefined);
  
  const handleViewGuest = (id: string) => {
    const guest = guestsList.find(g => g.id === id);
    if (guest) {
      toast({
        title: "View Guest",
        description: `Viewing guest profile for ${guest.firstName} ${guest.lastName}`,
      });
    }
  };
  
  const handleEditGuest = (id: string) => {
    const guest = guestsList.find(g => g.id === id);
    if (guest) {
      setCurrentGuest(guest);
      setIsFormOpen(true);
    }
  };
  
  const handleDeleteGuest = (id: string) => {
    // In a real app, you'd want a confirmation dialog
    setGuestsList(guestsList.filter(g => g.id !== id));
    toast({
      title: "Guest Deleted",
      description: "The guest has been deleted successfully.",
    });
  };
  
  const handleViewBookingHistory = (id: string) => {
    const guest = guestsList.find(g => g.id === id);
    if (guest) {
      const guestBookings = bookings.filter(b => b.guestId === id);
      toast({
        title: `Bookings for ${guest.firstName} ${guest.lastName}`,
        description: `Found ${guestBookings.length} bookings for this guest.`,
      });
    }
  };
  
  const handleCreateGuest = () => {
    setCurrentGuest(undefined);
    setIsFormOpen(true);
  };
  
  const handleFormSubmit = (data: Guest) => {
    if (currentGuest) {
      // Update existing guest
      setGuestsList(guestsList.map(g => 
        g.id === currentGuest.id ? data : g
      ));
      toast({
        title: "Guest Updated",
        description: "The guest has been updated successfully.",
      });
    } else {
      // Create new guest
      setGuestsList([...guestsList, data]);
      toast({
        title: "Guest Created",
        description: "A new guest has been created successfully.",
      });
    }
    setIsFormOpen(false);
  };
  
  const handleFormCancel = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="flex-1 ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Guests</h1>
            <p className="text-muted-foreground">Manage your guest profiles and information.</p>
          </div>
          
          <Button onClick={handleCreateGuest}>
            <PlusIcon size={16} className="mr-2" />
            New Guest
          </Button>
        </div>
        
        <GuestTable 
          guests={guestsList}
          onViewGuest={handleViewGuest}
          onEditGuest={handleEditGuest}
          onDeleteGuest={handleDeleteGuest}
          onViewBookingHistory={handleViewBookingHistory}
        />
        
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {currentGuest ? 'Edit Guest' : 'Create New Guest'}
              </DialogTitle>
            </DialogHeader>
            <GuestForm 
              guest={currentGuest}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Guests;
