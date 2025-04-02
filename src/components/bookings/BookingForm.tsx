
import React from 'react';
import { Booking } from '@/lib/types';
import { Form } from "@/components/ui/form";
import { guests } from '@/data/mockData';
import { useBookingForm } from './form/useBookingForm';
import HouseSelect from './form/HouseSelect';
import GuestSelect from './form/GuestSelect';
import DateRangeFields from './form/DateRangeFields';
import BookingStatusFields from './form/BookingStatusFields';
import BookingActionButtons from './form/BookingActionButtons';

interface BookingFormProps {
  booking?: Booking;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const BookingForm = ({ booking, onSubmit, onCancel }: BookingFormProps) => {
  const { form, availableHouses, handleSubmit } = useBookingForm(booking, onSubmit);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <HouseSelect form={form} availableHouses={availableHouses} />
          <GuestSelect form={form} guests={guests} />
        </div>
        
        <DateRangeFields form={form} />
        <BookingStatusFields form={form} />
        <BookingActionButtons isUpdating={!!booking} onCancel={onCancel} />
      </form>
    </Form>
  );
};

export default BookingForm;
