
import React from 'react';
import { Booking } from '@/lib/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import BookingForm from './BookingForm';
import UserBookingFormDialog from '@/components/user-bookings/UserBookingFormDialog';

interface BookingFormDialogProps {
  isUser: boolean;
  isFormOpen: boolean;
  setIsFormOpen: (open: boolean) => void;
  currentBooking: Booking | undefined;
  onSubmit: (data: Booking) => void;
  onCancel: () => void;
}

const BookingFormDialog = ({
  isUser,
  isFormOpen,
  setIsFormOpen,
  currentBooking,
  onSubmit,
  onCancel
}: BookingFormDialogProps) => {
  if (isUser) {
    return (
      <UserBookingFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        booking={currentBooking}
        onSubmit={onSubmit}
      />
    );
  }

  return (
    <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
      <DialogContent className="sm:max-w-[600px] bg-white border border-olive/20">
        <DialogHeader>
          <DialogTitle className="text-olive-dark">
            {currentBooking ? 'Edit Booking' : 'Create New Booking'}
          </DialogTitle>
        </DialogHeader>
        <BookingForm 
          booking={currentBooking}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BookingFormDialog;
