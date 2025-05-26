
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
    console.log(`Extra services total: $${total}`);
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
                     totalAmount > 0 &&
                     guestForm.formState.isValid &&
                     guestForm.watch('firstName') &&
                     guestForm.watch('lastName') &&
                     guestForm.watch('email') &&
                     guestForm.watch('phone');

  const finalTotal = totalAmount + extraServicesTotal;

  if (showPayment && bookingData) {
    return (
      <div className="space-y-6 max-h-[80vh] overflow-y-auto">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Complete Your Payment</h3>
          <p className="text-slate-600">
            Total Amount: <span className="font-bold text-green-600">${finalTotal.toFixed(2)}</span>
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
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <PayPalButton
          amount={finalTotal}
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
            {/* House Selection */}
            <HouseSelectionSection
              form={form}
              availableHouses={availableHouses}
              selectedHouse={selectedHouse}
              defaultHouseId={defaultHouseId}
              onViewDetails={handleViewDetails}
            />

            {/* Date Selection - only show when house is selected */}
            {selectedHouse && (
              <DateSelectionSection
                form={form}
                nights={nights}
              />
            )}

            {/* Extra Services - only show when house and dates are selected */}
            {selectedHouse && nights > 0 && (
              <ExtraServicesSection
                form={form}
                onServicesChange={handleExtraServicesChange}
              />
            )}

            {/* Booking Summary - only show when we have all required info */}
            {selectedHouse && nights > 0 && totalAmount > 0 && (
              <BookingSummarySection
                selectedHouse={selectedHouse}
                nights={nights}
                totalAmount={finalTotal}
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
                Proceed to Payment ({finalTotal > 0 ? `$${finalTotal.toFixed(2)}` : 'Calculate Total'})
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
