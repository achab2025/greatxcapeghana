
import React from 'react';
import { Button } from '@/components/ui/button';
import PayPalButton from '../../payments/PayPalButton';

interface PaymentSectionProps {
  finalTotal: number;
  nights: number;
  totalAmount: number;
  extraServices: any[];
  onPaymentSuccess: (details: any) => void;
  onPaymentError: (error: any) => void;
  onBack: () => void;
  isFormValid: boolean;
}

const PaymentSection = ({
  finalTotal,
  nights,
  totalAmount,
  extraServices,
  onPaymentSuccess,
  onPaymentError,
  onBack,
  isFormValid
}: PaymentSectionProps) => {
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
        onSuccess={onPaymentSuccess}
        onError={onPaymentError}
        disabled={!isFormValid}
      />

      <Button 
        type="button" 
        variant="outline" 
        onClick={onBack}
        className="w-full"
      >
        Back to Booking Details
      </Button>
    </div>
  );
};

export default PaymentSection;
