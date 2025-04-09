
import React, { useEffect, useState } from 'react';
import { Booking } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { BellRing, Clock } from 'lucide-react';

interface CheckoutAlertsProps {
  bookings: Booking[];
}

const CheckoutAlerts: React.FC<CheckoutAlertsProps> = ({ bookings }) => {
  const [upcomingCheckouts, setUpcomingCheckouts] = useState<Booking[]>([]);

  useEffect(() => {
    // Filter bookings that are due for checkout within the next hour
    const checkForUpcomingCheckouts = () => {
      const now = new Date();
      const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);
      
      const checkouts = bookings.filter(booking => {
        if (booking.bookingStatus !== 'confirmed') return false;
        
        const checkoutDate = new Date(booking.checkOutDate);
        return checkoutDate > now && checkoutDate <= oneHourFromNow;
      });
      
      setUpcomingCheckouts(checkouts);
      
      // Show toast notification if there are upcoming checkouts
      if (checkouts.length > 0) {
        toast({
          title: "Checkout Reminder",
          description: `You have ${checkouts.length} checkout(s) within the next hour.`,
          variant: "default",
        });
      }
    };
    
    // Check on component mount
    checkForUpcomingCheckouts();
    
    // Set interval to check every 5 minutes
    const intervalId = setInterval(checkForUpcomingCheckouts, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [bookings]);
  
  const sendCheckoutNotification = (booking: Booking) => {
    // This would typically call an API to send SMS/email
    console.log("Sending notification for booking:", booking.id);
    
    // Simulate API call
    toast({
      title: "Notification Sent",
      description: `Checkout reminder sent for ${booking.houseName}.`,
    });
  };

  if (upcomingCheckouts.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6 border-amber-200 bg-amber-50 shadow-md animate-pulse">
      <CardHeader className="pb-2">
        <CardTitle className="text-amber-700 flex items-center gap-2">
          <BellRing className="h-5 w-5" />
          Upcoming Checkouts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {upcomingCheckouts.map(booking => (
            <div key={booking.id} className="bg-white p-3 rounded-lg border border-amber-200 flex justify-between items-center">
              <div>
                <p className="font-medium text-amber-800">{booking.houseName}</p>
                <p className="text-xs text-amber-600 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 
                  Checkout at {new Date(booking.checkOutDate).toLocaleTimeString()}
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="border-amber-500 text-amber-700 hover:bg-amber-100"
                onClick={() => sendCheckoutNotification(booking)}
              >
                Send Reminder
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutAlerts;
