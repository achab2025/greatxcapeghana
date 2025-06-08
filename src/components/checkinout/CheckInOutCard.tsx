
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Booking } from '@/lib/types';
import { 
  LogInIcon, 
  LogOutIcon, 
  BellIcon, 
  QrCodeIcon,
  MapPinIcon,
  ClockIcon,
  UserIcon,
  PhoneIcon
} from 'lucide-react';

interface CheckInOutCardProps {
  booking: Booking;
  onCheckIn: (bookingId: string) => void;
  onCheckOut: (bookingId: string) => void;
  onSendNotification: (bookingId: string, type: 'checkin' | 'checkout') => void;
  onGenerateQR: (bookingId: string) => void;
}

const CheckInOutCard = ({
  booking,
  onCheckIn,
  onCheckOut,
  onSendNotification,
  onGenerateQR
}: CheckInOutCardProps) => {
  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <Badge className="bg-blue-500">Awaiting Check-in</Badge>;
      case 'checked-in':
        return <Badge className="bg-green-500">Checked In</Badge>;
      case 'completed':
        return <Badge className="bg-gray-500">Checked Out</Badge>;
      case 'canceled':
        return <Badge className="bg-red-500">Canceled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const canCheckIn = booking.bookingStatus === 'confirmed' && isToday(booking.checkInDate);
  const canCheckOut = booking.bookingStatus === 'checked-in' && 
    (isToday(booking.checkOutDate) || new Date(booking.checkOutDate) < new Date());

  return (
    <Card className="border border-slate-200 hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold text-slate-800">
            {booking.houseName}
          </CardTitle>
          {getStatusBadge(booking.bookingStatus)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <UserIcon size={16} />
            <span className="font-medium">{booking.guestName}</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <ClockIcon size={16} />
            <span>
              {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPinIcon size={16} />
            <span>${booking.totalAmount}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {canCheckIn && (
            <Button 
              onClick={() => onCheckIn(booking.id)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <LogInIcon size={16} className="mr-2" />
              Check In
            </Button>
          )}

          {canCheckOut && (
            <Button 
              onClick={() => onCheckOut(booking.id)}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <LogOutIcon size={16} className="mr-2" />
              Check Out
            </Button>
          )}

          <div className="grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onSendNotification(booking.id, canCheckIn ? 'checkin' : 'checkout')}
            >
              <BellIcon size={14} className="mr-1" />
              Notify
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onGenerateQR(booking.id)}
            >
              <QrCodeIcon size={14} className="mr-1" />
              QR Code
            </Button>
          </div>
        </div>

        {(isToday(booking.checkInDate) || isToday(booking.checkOutDate)) && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-amber-700 text-sm font-medium">
              <ClockIcon size={14} />
              {isToday(booking.checkInDate) ? 'Check-in Today' : 'Check-out Today'}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CheckInOutCard;
