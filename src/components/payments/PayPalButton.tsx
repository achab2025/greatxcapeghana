
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface PayPalButtonProps {
  amount: number;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
  disabled?: boolean;
}

const PayPalButton = ({ amount, onSuccess, onError, disabled }: PayPalButtonProps) => {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [paypalLoaded, setPaypalLoaded] = React.useState(false);

  useEffect(() => {
    // Load PayPal SDK with sandbox client ID for demo
    const loadPayPalScript = () => {
      if ((window as any).paypal) {
        setPaypalLoaded(true);
        setIsLoading(false);
        return;
      }

      const script = document.createElement('script');
      // Using PayPal's sandbox demo client ID
      script.src = 'https://www.paypal.com/sdk/js?client-id=AYpEEroyVBG4VAlr6P5qRJaK6BrpWJpvxoGmEXJkr6R3gESkwXZTLzpSMN6_2sXZcWRsFnz9E9qnY_Er&currency=USD';
      script.async = true;
      script.onload = () => {
        console.log('PayPal SDK loaded successfully');
        setPaypalLoaded(true);
        setIsLoading(false);
      };
      script.onerror = () => {
        console.error('Failed to load PayPal SDK');
        setIsLoading(false);
        onError('Failed to load PayPal SDK');
      };
      document.body.appendChild(script);
    };

    loadPayPalScript();
  }, [onError]);

  useEffect(() => {
    if (paypalLoaded && paypalRef.current && amount > 0 && !disabled) {
      // Clear previous PayPal buttons
      paypalRef.current.innerHTML = '';

      console.log(`Rendering PayPal button for amount: $${amount}`);

      (window as any).paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          console.log('Creating PayPal order for amount:', amount);
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toFixed(2)
              },
              description: 'Three House Haven Booking'
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          console.log('PayPal payment approved:', data);
          return actions.order.capture().then((details: any) => {
            console.log('PayPal payment captured:', details);
            onSuccess({
              ...details,
              orderID: data.orderID,
              payerID: data.payerID,
              amount: amount
            });
          });
        },
        onError: (err: any) => {
          console.error('PayPal payment error:', err);
          onError(err);
        },
        onCancel: (data: any) => {
          console.log('PayPal payment cancelled:', data);
          onError('Payment was cancelled');
        },
        style: {
          layout: 'vertical',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
          height: 40
        }
      }).render(paypalRef.current);
    }
  }, [paypalLoaded, amount, onSuccess, onError, disabled]);

  if (isLoading) {
    return (
      <Button disabled className="w-full bg-blue-600">
        Loading PayPal...
      </Button>
    );
  }

  if (!paypalLoaded) {
    return (
      <Button disabled className="w-full bg-red-600">
        PayPal unavailable - Please try again
      </Button>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Demo Mode:</strong> This is a PayPal sandbox environment for testing. 
          Use test credentials or your PayPal sandbox account to complete the payment.
        </p>
        <p className="text-xs text-yellow-700 mt-2">
          Test Amount: ${amount.toFixed(2)}
        </p>
      </div>
      <div 
        ref={paypalRef} 
        className={disabled ? 'opacity-50 pointer-events-none' : ''}
      ></div>
    </div>
  );
};

export default PayPalButton;
