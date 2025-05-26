
import { toast } from '@/components/ui/use-toast';

export const usePaymentHandling = (
  onSubmit: (data: any) => void,
  setShowPayment: (show: boolean) => void
) => {
  const handlePaymentSuccess = (details: any, bookingData: any) => {
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

  const handleBackToBooking = () => {
    setShowPayment(false);
  };

  return {
    handlePaymentSuccess,
    handlePaymentError,
    handleBackToBooking
  };
};
