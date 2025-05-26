
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
    // Load PayPal SDK
    const loadPayPalScript = () => {
      if ((window as any).paypal) {
        setPaypalLoaded(true);
        setIsLoading(false);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=sandbox&currency=USD';
      script.async = true;
      script.onload = () => {
        setPaypalLoaded(true);
        setIsLoading(false);
      };
      script.onerror = () => {
        setIsLoading(false);
        onError('Failed to load PayPal SDK');
      };
      document.body.appendChild(script);
    };

    loadPayPalScript();
  }, [onError]);

  useEffect(() => {
    if (paypalLoaded && paypalRef.current && amount > 0) {
      // Clear previous PayPal buttons
      paypalRef.current.innerHTML = '';

      (window as any).paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: amount.toFixed(2)
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            onSuccess(details);
          });
        },
        onError: (err: any) => {
          onError(err);
        }
      }).render(paypalRef.current);
    }
  }, [paypalLoaded, amount, onSuccess, onError]);

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
        PayPal unavailable
      </Button>
    );
  }

  return (
    <div className="w-full">
      <div ref={paypalRef} className={disabled ? 'opacity-50 pointer-events-none' : ''}></div>
    </div>
  );
};

export default PayPalButton;
