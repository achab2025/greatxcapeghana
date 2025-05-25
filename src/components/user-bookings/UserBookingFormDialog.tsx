
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import UserBookingForm from './UserBookingForm';
import BookingReceipt from './BookingReceipt';
import { Booking } from '@/lib/types';

interface UserBookingFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Booking) => void;
  defaultHouseId?: string;
  booking?: Booking;
}

const UserBookingFormDialog = ({ 
  open, 
  onOpenChange, 
  onSubmit,
  defaultHouseId,
  booking
}: UserBookingFormDialogProps) => {
  const [showReceipt, setShowReceipt] = useState(false);
  const [completedBooking, setCompletedBooking] = useState<any>(null);

  const handleFormSubmit = (data: any) => {
    setCompletedBooking(data);
    onSubmit(data);
    setShowReceipt(true);
  };

  const handleReceiptClose = (open: boolean) => {
    setShowReceipt(open);
    if (!open) {
      onOpenChange(false);
      setCompletedBooking(null);
    }
  };

  return (
    <>
      <Dialog open={open && !showReceipt} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[650px] bg-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-800">
              {booking ? 'Edit Booking' : 'Book Your Stay'}
            </DialogTitle>
          </DialogHeader>
          <UserBookingForm
            defaultHouseId={defaultHouseId}
            booking={booking}
            onSubmit={handleFormSubmit}
            onCancel={() => onOpenChange(false)}
          />
        </DialogContent>
      </Dialog>

      <BookingReceipt
        open={showReceipt}
        onOpenChange={handleReceiptClose}
        booking={completedBooking}
      />
    </>
  );
};

export default UserBookingFormDialog;
