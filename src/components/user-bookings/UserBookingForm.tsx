
import React, { useEffect } from 'react';
import { Form } from '@/components/ui/form';
import { useBookingForm } from '@/components/bookings/form/useBookingForm';
import { Booking } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { useBookingState } from '@/hooks/useBookingState';
import { usePaymentHandling } from '@/hooks/usePaymentHandling';
import { useBookingFormValidation } from '@/hooks/useBookingFormValidation';
import { useBookingFormSubmission } from '@/hooks/useBookingFormSubmission';
import { useAutomaticPriceCalculation } from '@/hooks/useAutomaticPriceCalculation';
import HouseDetailDialog from './HouseDetailDialog';
import GuestInfoSection from './form/GuestInfoSection';
import HouseSelectionSection from './form/HouseSelectionSection';
import DateSelectionSection from './form/DateSelectionSection';
import BookingSummarySection from './form/BookingSummarySection';
import ExtraServicesSection from './form/ExtraServicesSection';
import PaymentSection from './form/PaymentSection';
import ActionButtons from './form/ActionButtons';

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

  const { handleFormSubmission } = useBookingFormSubmission(
    guestForm,
    extraServices,
    extraServicesTotal,
    setBookingData,
    setShowPayment
  );

  const {
    form,
    availableHouses,
    handleSubmit: originalHandleSubmit
  } = useBookingForm(handleFormSubmission, booking);

  const selectedHouse = availableHouses.find(h => h.id === form.watch('houseId'));
  
  const {
    nights,
    isFormValid,
    totalAmount
  } = useBookingFormValidation(form, guestForm, selectedHouse);

  const {
    handlePaymentSuccess,
    handlePaymentError,
    handleBackToBooking
  } = usePaymentHandling(onSubmit, setShowPayment);

  // Use automatic price calculation hook
  useAutomaticPriceCalculation(form, availableHouses);

  // Custom form submit handler with additional logging
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('🔥 FORM SUBMIT: Form submit handler triggered');
    console.log('🔥 FORM SUBMIT: Current form validity:', isFormValid);
    console.log('🔥 FORM SUBMIT: Show payment state:', showPayment);
    console.log('🔥 FORM SUBMIT: Selected house:', selectedHouse?.name);
    console.log('🔥 FORM SUBMIT: Nights:', nights);
    console.log('🔥 FORM SUBMIT: Total amount:', totalAmount);
    
    if (!isFormValid) {
      console.log('🚫 FORM SUBMIT: Form is not valid, preventing submission');
      return;
    }
    
    console.log('✅ FORM SUBMIT: Form is valid, calling original handle submit');
    try {
      originalHandleSubmit();
      console.log('✅ FORM SUBMIT: Original handle submit called successfully');
    } catch (error) {
      console.error('❌ FORM SUBMIT: Error in original handle submit:', error);
    }
  };

  // Set default house if provided
  useEffect(() => {
    if (defaultHouseId && !form.watch('houseId')) {
      form.setValue('houseId', defaultHouseId);
    }
  }, [defaultHouseId, form]);

  const finalTotal = totalAmount + extraServicesTotal;

  console.log('🎨 RENDER: Component rendering with showPayment:', showPayment, 'and bookingData:', !!bookingData);

  if (showPayment && bookingData) {
    console.log('💳 RENDER: Rendering payment section with data:', bookingData);
    return <PaymentSection 
      finalTotal={finalTotal} 
      nights={nights} 
      totalAmount={totalAmount} 
      extraServices={extraServices} 
      onPaymentSuccess={details => handlePaymentSuccess(details, bookingData)} 
      onPaymentError={handlePaymentError} 
      onBack={handleBackToBooking} 
      isFormValid={isFormValid} 
    />;
  }

  console.log('📝 RENDER: Rendering booking form');

  return (
    <>
      <div className="space-y-8 max-h-[80vh] overflow-y-auto">
        <GuestInfoSection guestForm={guestForm} />

        <Form {...form}>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <HouseSelectionSection 
              form={form} 
              availableHouses={availableHouses} 
              selectedHouse={selectedHouse} 
              defaultHouseId={defaultHouseId} 
              onViewDetails={handleViewDetails} 
            />

            {selectedHouse && (
              <DateSelectionSection form={form} nights={nights} />
            )}

            {selectedHouse && nights > 0 && (
              <ExtraServicesSection 
                form={form} 
                onServicesChange={handleExtraServicesChange} 
              />
            )}

            {selectedHouse && nights > 0 && totalAmount > 0 && (
              <BookingSummarySection 
                selectedHouse={selectedHouse} 
                nights={nights} 
                totalAmount={finalTotal} 
              />
            )}

            <ActionButtons 
              isFormValid={isFormValid}
              finalTotal={finalTotal}
              onCancel={onCancel}
              onSubmit={handleFormSubmit}
            />
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
