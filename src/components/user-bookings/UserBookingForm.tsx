
import React, { useEffect } from 'react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useBookingForm } from '@/components/bookings/form/useBookingForm';
import { Booking } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import HouseDetailDialog from './HouseDetailDialog';
import GuestInfoSection from './form/GuestInfoSection';
import HouseSelectionSection from './form/HouseSelectionSection';
import DateSelectionSection from './form/DateSelectionSection';
import BookingSummarySection from './form/BookingSummarySection';

interface UserBookingFormProps {
  booking?: Booking;
  defaultHouseId?: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const UserBookingForm = ({ booking, defaultHouseId, onSubmit, onCancel }: UserBookingFormProps) => {
  const [showHouseDetail, setShowHouseDetail] = React.useState(false);
  const [selectedHouseForDetail, setSelectedHouseForDetail] = React.useState<string>('');

  const guestForm = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    }
  });

  const { form, availableHouses, handleSubmit } = useBookingForm((bookingData) => {
    const guestData = guestForm.getValues();
    
    // Generate random login credentials
    const username = `${guestData.firstName.toLowerCase()}${Date.now()}`;
    const password = Math.random().toString(36).slice(-8);
    const guestId = `guest_${Date.now()}`;
    
    const enhancedData = {
      ...bookingData,
      guestId,
      guestName: `${guestData.firstName} ${guestData.lastName}`,
      guestInfo: guestData,
      credentials: {
        username,
        password
      },
      bookingStatus: 'confirmed',
      paymentStatus: 'pending',
    };
    
    onSubmit(enhancedData);
    toast({
      title: "Booking Confirmed!",
      description: "Your booking has been confirmed. Check your receipt for login credentials.",
    });
  }, booking);

  const selectedHouse = availableHouses.find(h => h.id === form.watch('houseId'));
  const checkInDate = form.watch('checkInDate');
  const checkOutDate = form.watch('checkOutDate');
  const totalAmount = form.watch('totalAmount');

  // Calculate nights
  const nights = React.useMemo(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  }, [checkInDate, checkOutDate]);

  const handleViewDetails = (houseId: string) => {
    setSelectedHouseForDetail(houseId);
    setShowHouseDetail(true);
  };

  return (
    <>
      <div className="space-y-8 max-h-[80vh] overflow-y-auto">
        {/* Guest Information Section */}
        <GuestInfoSection guestForm={guestForm} />

        {/* Booking Details Section */}
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* House Selection */}
            <HouseSelectionSection
              form={form}
              availableHouses={availableHouses}
              selectedHouse={selectedHouse}
              defaultHouseId={defaultHouseId}
              onViewDetails={handleViewDetails}
            />

            {/* Date Selection */}
            <DateSelectionSection
              form={form}
              nights={nights}
            />

            {/* Booking Summary */}
            {selectedHouse && nights > 0 && (
              <BookingSummarySection
                selectedHouse={selectedHouse}
                nights={nights}
                totalAmount={totalAmount}
              />
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-medium"
                disabled={!selectedHouse || nights <= 0 || !guestForm.formState.isValid}
              >
                Confirm Booking
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <HouseDetailDialog
        open={showHouseDetail}
        onOpenChange={setShowHouseDetail}
        houseId={selectedHouseForDetail}
      />
    </>
  );
};

export default UserBookingForm;
