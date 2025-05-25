
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CheckCircleIcon, UserIcon, KeyIcon, HomeIcon, CalendarIcon, DollarSignIcon } from 'lucide-react';

interface BookingReceiptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: any;
}

const BookingReceipt = ({ open, onOpenChange, booking }: BookingReceiptProps) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleLoginRedirect = () => {
    // Store the credentials temporarily for auto-login
    localStorage.setItem('tempUsername', booking.credentials.username);
    localStorage.setItem('tempPassword', booking.credentials.password);
    onOpenChange(false);
    window.location.href = '/login';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl font-semibold text-green-700">
            <CheckCircleIcon className="mr-2 text-green-600" size={24} />
            Booking Confirmed!
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Booking Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <HomeIcon className="mr-2" size={20} />
                Booking Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Booking ID</p>
                  <p className="font-semibold">{booking.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Status</p>
                  <Badge className="bg-green-500">Confirmed</Badge>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm text-slate-600">Guest Name</p>
                <p className="font-semibold">{booking.guestName}</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-600">Email</p>
                <p className="font-semibold">{booking.guestInfo?.email}</p>
              </div>
              
              <div>
                <p className="text-sm text-slate-600">Accommodation</p>
                <p className="font-semibold">{booking.houseName}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600">Check-in Date</p>
                  <p className="font-semibold flex items-center">
                    <CalendarIcon className="mr-1" size={16} />
                    {booking.checkInDate}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Check-out Date</p>
                  <p className="font-semibold flex items-center">
                    <CalendarIcon className="mr-1" size={16} />
                    {booking.checkOutDate}
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium flex items-center">
                    <DollarSignIcon className="mr-1" size={16} />
                    Total Amount:
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    ${booking.totalAmount}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Login Credentials */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="flex items-center text-lg text-green-800">
                <UserIcon className="mr-2" size={20} />
                Your Login Credentials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-green-700">
                Use these credentials to login and manage your booking:
              </p>
              
              <div className="bg-white p-4 rounded-lg border border-green-200">
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <p className="text-sm text-slate-600 flex items-center">
                      <UserIcon className="mr-1" size={14} />
                      Username
                    </p>
                    <p className="font-mono font-semibold text-lg">{booking.credentials.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 flex items-center">
                      <KeyIcon className="mr-1" size={14} />
                      Password
                    </p>
                    <p className="font-mono font-semibold text-lg">{booking.credentials.password}</p>
                  </div>
                </div>
              </div>
              
              <div className="text-xs text-green-600 bg-green-100 p-3 rounded-lg">
                <p className="font-medium">Important:</p>
                <p>• Save these credentials in a safe place</p>
                <p>• You can use them to login and manage your bookings</p>
                <p>• Contact support if you lose these credentials</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between space-x-3">
            <Button variant="outline" onClick={handlePrint}>
              Print Receipt
            </Button>
            <div className="space-x-3">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
              <Button onClick={handleLoginRedirect} className="bg-green-600 hover:bg-green-700">
                Login Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingReceipt;
