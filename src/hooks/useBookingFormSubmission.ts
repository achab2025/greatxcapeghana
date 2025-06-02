
import { UseFormReturn } from 'react-hook-form';
import { toast } from '@/components/ui/use-toast';

export const useBookingFormSubmission = (
  guestForm: UseFormReturn<any>,
  extraServices: any[],
  extraServicesTotal: number,
  setBookingData: (data: any) => void,
  setShowPayment: (show: boolean) => void
) => {
  const handleFormSubmission = (data: any) => {
    console.log('🚀 BOOKING FORM: Form submission triggered with data:', data);
    
    const guestData = guestForm.getValues();
    console.log('👤 BOOKING FORM: Guest data:', guestData);
    
    const isGuestFormValid = guestData.firstName && guestData.lastName && guestData.email && guestData.phone;
    
    console.log('✅ BOOKING FORM: Guest form validation:', {
      firstName: !!guestData.firstName,
      lastName: !!guestData.lastName,
      email: !!guestData.email,
      phone: !!guestData.phone,
      isGuestFormValid
    });
    
    if (!isGuestFormValid) {
      console.log('❌ BOOKING FORM: Guest form validation failed - showing toast');
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
    
    console.log('💾 BOOKING FORM: Setting booking data for payment:', enhancedData);
    setBookingData(enhancedData);
    console.log('💳 BOOKING FORM: Setting showPayment to true');
    setShowPayment(true);
    console.log('🎯 BOOKING FORM: Form submission completed successfully');
  };

  return { handleFormSubmission };
};
