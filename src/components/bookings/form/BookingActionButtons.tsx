
import React from 'react';
import { Button } from "@/components/ui/button";

interface BookingActionButtonsProps {
  isUpdating: boolean;
  onCancel: () => void;
}

const BookingActionButtons = ({ isUpdating, onCancel }: BookingActionButtonsProps) => {
  return (
    <div className="flex justify-end space-x-2 mt-6">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit">
        {isUpdating ? 'Update Booking' : 'Create Booking'}
      </Button>
    </div>
  );
};

export default BookingActionButtons;
