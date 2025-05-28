import React, { useEffect } from 'react';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useBookingForm } from '@/components/bookings/form/useBookingForm';
import { Booking } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { useBookingState } from '@/hooks/useBookingState';
import { useBookingValidation } from '@/hooks/useBookingValidation';
import { usePaymentHandling } from '@/hooks/usePaymentHandling';
import HouseDetailDialog from './HouseDetailDialog';
import GuestInfoSection from './form/GuestInfoSection';
import HouseSelectionSection from './form/HouseSelectionSection';
import DateSelectionSection from './form/DateSelectionSection';
import BookingSummarySection from './form/BookingSummarySection';
import ExtraServicesSection from './form/ExtraServicesSection';
import PaymentSection from './form/PaymentSection';
interface UserBookingFormProps {
  booking?: Booking;
  defaultHouseId?: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}
const UserBookingForm = ({
  booking,
  defaultHouseId,
  onSubmit,
  onCancel
}: UserBookingFormProps) => {
  const {
    showHouseDetail,
    setShowHouseDetail,
    selectedHouseForDetail,
    extraServices,
    extraServicesTotal,
    showPayment,
    setShowPayment,
    bookingData,
    setBookingData,
    handleViewDetails,
    handleExtraServicesChange
  } = useBookingState();
  const guestForm = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    },
    mode: 'onChange'
  });
  const {
    form,
    availableHouses,
    handleSubmit
  } = useBookingForm(data => {
    const guestData = guestForm.getValues();
    const isGuestFormValid = guestForm.formState.isValid && guestData.firstName && guestData.lastName && guestData.email && guestData.phone;
    if (!isGuestFormValid) {
      toast({
        title: "Please fill in all required guest information",
        description: "First name, last name, email, and phone are required.",
        variant: "destructive"
      });
      return;
    }

    // Generate random login credentials
    const username = `${guestData.firstName.toLowerCase()}${Date.now()}`;
    const password = Math.random().toString(36).slice(-8);
    const guestId = `guest_${Date.now()}`;
    const enhancedData = {
      ...data,
      guestId,
      guestName: `${guestData.firstName} ${guestData.lastName}`,
      guestInfo: guestData,
      credentials: {
        username,
        password
      },
      extraServices,
      extraServicesTotal,
      totalAmount: data.totalAmount + extraServicesTotal,
      bookingStatus: 'confirmed',
      paymentStatus: 'pending'
    };
    console.log('Setting booking data for payment:', enhancedData);
    setBookingData(enhancedData);
    setShowPayment(true);
  }, booking);
  const selectedHouse = availableHouses.find(h => h.id === form.watch('houseId'));
  const checkInDate = form.watch('checkInDate');
  const checkOutDate = form.watch('checkOutDate');
  const totalAmount = form.watch('totalAmount') || 0;

  // Calculate nights first - before using it in validation
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
  const {
    isFormValid
  } = useBookingValidation(selectedHouse, nights, totalAmount, guestForm);
  const {
    handlePaymentSuccess,
    handlePaymentError,
    handleBackToBooking
  } = usePaymentHandling(onSubmit, setShowPayment);

  // Set default house if provided
  useEffect(() => {
    if (defaultHouseId && !form.watch('houseId')) {
      form.setValue('houseId', defaultHouseId);
    }
  }, [defaultHouseId, form]);

  // Automatic price calculation when house or dates change
  useEffect(() => {
    const houseId = form.watch('houseId');
    const checkIn = form.watch('checkInDate');
    const checkOut = form.watch('checkOutDate');
    if (houseId && checkIn && checkOut) {
      const house = availableHouses.find(h => h.id === houseId);
      if (house) {
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const timeDiff = endDate.getTime() - startDate.getTime();
        const nightsCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
        if (nightsCount > 0) {
          const baseTotal = house.pricePerNight * nightsCount;
          form.setValue('totalAmount', baseTotal);
          console.log(`Price calculation: ${nightsCount} nights × $${house.pricePerNight} = $${baseTotal}`);
        }
      }
    }
  }, [form.watch('houseId'), form.watch('checkInDate'), form.watch('checkOutDate'), availableHouses, form]);
  const finalTotal = totalAmount + extraServicesTotal;
  if (showPayment && bookingData) {
    return <PaymentSection finalTotal={finalTotal} nights={nights} totalAmount={totalAmount} extraServices={extraServices} onPaymentSuccess={details => handlePaymentSuccess(details, bookingData)} onPaymentError={handlePaymentError} onBack={handleBackToBooking} isFormValid={isFormValid} />;
  }
  return <>
      <div className="space-y-8 max-h-[80vh] overflow-y-auto">
        {/* Guest Information Section */}
        <GuestInfoSection guestForm={guestForm} />

        {/* Booking Details Section */}
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* House Selection */}
            <HouseSelectionSection form={form} availableHouses={availableHouses} selectedHouse={selectedHouse} defaultHouseId={defaultHouseId} onViewDetails={handleViewDetails} />

            {/* Date Selection - only show when house is selected */}
            {selectedHouse && <DateSelectionSection form={form} nights={nights} />}

            {/* Extra Services - only show when house and dates are selected */}
            {selectedHouse && nights > 0 && <ExtraServicesSection form={form} onServicesChange={handleExtraServicesChange} />}

            {/* Booking Summary - only show when we have all required info */}
            {selectedHouse && nights > 0 && totalAmount > 0 && <BookingSummarySection selectedHouse={selectedHouse} nights={nights} totalAmount={finalTotal} />}

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel} className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8">
                Cancel
              </Button>
              <Button type="submit" disabled={!isFormValid} className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-medium bg-olive-DEFAULT">
                Proceed to Payment {finalTotal > 0 ? `($${finalTotal.toFixed(2)})` : '(Calculate Total)'}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <HouseDetailDialog open={showHouseDetail} onOpenChange={setShowHouseDetail} houseId={selectedHouseForDetail} />
    </>;
};
export default UserBookingForm;