
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { BedIcon, DollarSignIcon, CalendarIcon } from 'lucide-react';
import { useWordPressHouses, sendBookingToWordPress } from '@/lib/wordpress-api';
import UserBookingFormDialog from '@/components/user-bookings/UserBookingFormDialog';
import { toast } from '@/components/ui/use-toast';

const WordPressBookingIntegration = () => {
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedHouseId, setSelectedHouseId] = useState<string>('');
  const { houses, isLoading, error } = useWordPressHouses();

  const handleBookNow = (houseId: string) => {
    setSelectedHouseId(houseId);
    setShowBookingDialog(true);
  };

  const handleBookingSubmit = async (bookingData: any) => {
    try {
      console.log('Sending booking to WordPress:', bookingData);
      const result = await sendBookingToWordPress(bookingData);
      
      toast({
        title: "Booking Sent to WordPress!",
        description: `Your booking has been submitted to your WordPress site.`,
      });
      
      console.log('Booking successfully sent to WordPress:', result);
    } catch (error) {
      console.error('Failed to send booking to WordPress:', error);
      toast({
        title: "Booking Saved Locally",
        description: "Could not connect to WordPress, but your booking is saved locally.",
        variant: "destructive"
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">WordPress Houses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Unable to Load WordPress Houses</h2>
        <p className="text-red-600 mb-4">{error}</p>
        <p className="text-sm text-slate-600 mb-4">
          Please make sure:
          <br />• Your WordPress site URL is correct in src/lib/wordpress-api.ts
          <br />• You have a 'houses' custom post type in WordPress
          <br />• Your WordPress REST API is accessible
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700"
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Houses from WordPress</h2>
        <p className="text-slate-600">Book directly from your WordPress website</p>
      </div>
      
      {houses.length === 0 ? (
        <div className="text-center p-6 bg-slate-50 rounded-lg">
          <p className="text-lg text-slate-600">No houses found.</p>
          <p className="text-sm text-slate-500 mt-2">
            Please make sure your WordPress site has published houses.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses.map((house) => (
            <Card key={house.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 bg-slate-200">
                <img 
                  src={house.imageUrl} 
                  alt={house.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <div className="absolute top-3 right-3">
                  <Badge className={
                    house.status === 'available' ? 'bg-green-500' :
                    house.status === 'booked' ? 'bg-blue-500' : 'bg-amber-500'
                  }>
                    {house.status}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{house.name}</CardTitle>
                <p className="text-slate-600 line-clamp-2">{house.description}</p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <BedIcon size={16} className="mr-2 text-slate-500" />
                    <span className="text-sm">{house.maxOccupancy} guests</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSignIcon size={16} className="mr-2 text-slate-500" />
                    <span className="text-sm font-medium">${house.pricePerNight}/night</span>
                  </div>
                </div>

                {house.amenities.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Amenities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {house.amenities.slice(0, 3).map((amenity: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity.trim()}
                        </Badge>
                      ))}
                      {house.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{house.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                <Button 
                  onClick={() => handleBookNow(house.id)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={house.status !== 'available'}
                >
                  <CalendarIcon className="mr-2" size={16} />
                  {house.status === 'available' ? 'Book Now' : 'Not Available'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <UserBookingFormDialog
        open={showBookingDialog}
        onOpenChange={setShowBookingDialog}
        defaultHouseId={selectedHouseId}
        onSubmit={handleBookingSubmit}
      />
    </div>
  );
};

export default WordPressBookingIntegration;
