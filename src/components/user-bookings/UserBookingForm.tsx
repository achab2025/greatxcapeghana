
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
import ExtraServicesSection from './form/ExtraServicesSection';
import PayPalButton from '../payments/PayPalButton';

interface UserBookingFormProps {
  booking?: Booking;
  defaultHouseId?: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const UserBookingForm = ({ booking, defaultHouseId, onSubmit, onCancel }: UserBookingFormProps) => {
  const [showHouseDetail, setShowHouseDetail] = React.useState(false);
  const [selectedHouseForDetail, setSelectedHouseForDetail] = React.useState<string>('');
  const [extraServices, setExtraServices] = React.useState<any[]>([]);
  const [extraServicesTotal, setExtraServicesTotal] = React.useState(0);
  const [showPayment, setShowPayment] = React.useState(false);
  const [bookingData, setBookingData] = React.useState<any>(null);

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

  const { form, availableHouses, handleSubmit } = useBookingForm((data) => {
    const guestData = guestForm.getValues();
    const isGuestFormValid = guestForm.formState.isValid && 
      guestData.firstName && 
      guestData.lastName && 
      guestData.email && 
      guestData.phone;
    
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
      paymentStatus: 'pending',
    };
    
    setBookingData(enhancedData);
    setShowPayment(true);
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

  const handleExtraServicesChange = (services: any[], total: number) => {
    setExtraServices(services);
    setExtraServicesTotal(total);
  };

  const handlePaymentSuccess = (details: any) => {
    const finalBookingData = {
      ...bookingData,
      paymentStatus: 'paid',
      paymentDetails: details
    };
    
    onSubmit(finalBookingData);
    toast({
      title: "Payment Successful!",
      description: "Your booking has been confirmed and paid. Check your receipt for login credentials.",
    });
  };

  const handlePaymentError = (error: any) => {
    toast({
      title: "Payment Failed",
      description: "There was an issue processing your payment. Please try again.",
      variant: "destructive"
    });
    console.error('PayPal Error:', error);
  };

  const isFormValid = selectedHouse && 
                     nights > 0 && 
                     guestForm.formState.isValid &&
                     guestForm.watch('firstName') &&
                     guestForm.watch('lastName') &&
                     guestForm.watch('email') &&
                     guestForm.watch('phone');

  if (showPayment && bookingData) {
    return (
      <div className="space-y-6 max-h-[80vh] overflow-y-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Complete Your Payment</h3>
          <p className="text-slate-600">
            Total Amount: <span className="font-bold text-green-600">${(totalAmount + extraServicesTotal).toFixed(2)}</span>
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Booking Summary:</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Accommodation ({nights} nights)</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            {extraServices.map(service => (
              <div key={service.id} className="flex justify-between">
                <span>{service.name}</span>
                <span>${service.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total</span>
              <span>${(totalAmount + extraServicesTotal).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <PayPalButton
          amount={totalAmount + extraServicesTotal}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
          disabled={!isFormValid}
        />

        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setShowPayment(false)}
          className="w-full"
        >
          Back to Booking Details
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8 max-h-[80vh] overflow-y-auto">
        {/* Guest Information Section */}
        <GuestInfoSection guestForm={guestForm} />

        {/* Booking Details Section */}
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* House Selection - only show if no house is selected */}
            {!selectedHouse && (
              <HouseSelectionSection
                form={form}
                availableHouses={availableHouses}
                selectedHouse={selectedHouse}
                defaultHouseId={defaultHouseId}
                onViewDetails={handleViewDetails}
              />
            )}

            {/* Selected House Summary - show when house is selected */}
            {selectedHouse && (
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-green-800">{selectedHouse.name}</h3>
                    <p className="text-sm text-green-600">${selectedHouse.pricePerNight}/night • Max {selectedHouse.maxOccupancy} guests</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => form.setValue('houseId', '')}
                    className="border-green-300 text-green-700 hover:bg-green-100"
                  >
                    Change House
                  </Button>
                </div>
              </div>
            )}

            {/* Date Selection */}
            <DateSelectionSection
              form={form}
              nights={nights}
            />

            {/* Extra Services */}
            {selectedHouse && nights > 0 && (
              <ExtraServicesSection
                form={form}
                onServicesChange={handleExtraServicesChange}
              />
            )}

            {/* Booking Summary */}
            {selectedHouse && nights > 0 && (
              <BookingSummarySection
                selectedHouse={selectedHouse}
                nights={nights}
                totalAmount={totalAmount + extraServicesTotal}
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
                disabled={!isFormValid}
              >
                Proceed to Payment
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
