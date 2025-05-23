
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import UserBookingForm from './UserBookingForm';
import { Booking } from '@/lib/types';

interface UserBookingFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Booking) => void;
  defaultHouseId?: string;
}

const UserBookingFormDialog = ({ 
  open, 
  onOpenChange, 
  onSubmit,
  defaultHouseId 
}: UserBookingFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">
            Request a New Booking
          </DialogTitle>
        </DialogHeader>
        <UserBookingForm
          defaultHouseId={defaultHouseId}
          onSubmit={onSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserBookingFormDialog;
