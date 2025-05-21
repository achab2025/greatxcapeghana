
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import UserBookingForm from './UserBookingForm';
import { Booking } from '@/lib/types';

interface UserBookingFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking?: Booking;
  onSubmit: (data: Booking) => void;
}

const UserBookingFormDialog = ({ 
  open, 
  onOpenChange, 
  booking, 
  onSubmit 
}: UserBookingFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">
            {booking ? 'Modify Your Booking' : 'Request a New Booking'}
          </DialogTitle>
        </DialogHeader>
        <UserBookingForm
          booking={booking}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserBookingFormDialog;
