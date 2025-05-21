
import React, { useState } from 'react';
import { House } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BedIcon, DollarSignIcon, SquareAsteriskIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import UserBookingFormDialog from '@/components/user-bookings/UserBookingFormDialog';

interface UserHousesSectionProps {
  houses: House[];
}

const UserHousesSection = ({ houses }: UserHousesSectionProps) => {
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);
  const [bookingDialogOpen, setBookingDialogOpen] = useState(false);

  const handleBookNow = (house: House) => {
    setSelectedHouse(house);
    setBookingDialogOpen(true);
  };

  const handleBookingSubmit = (data: any) => {
    toast({
      title: "Booking Submitted",
      description: `Your booking for ${data.houseName || selectedHouse?.name} has been submitted successfully.`,
    });
    setBookingDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'available':
        return <Badge className="bg-green-500">Available</Badge>;
      case 'booked':
        return <Badge className="bg-blue-500">Booked</Badge>;
      case 'maintenance':
        return <Badge className="bg-amber-500">Maintenance</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {houses.map((house) => (
          <Card key={house.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="h-48 bg-muted">
              <img 
                src={house.imageUrl} 
                alt={house.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{house.name}</CardTitle>
                {getStatusBadge(house.status)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{house.description}</p>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <BedIcon size={16} className="mr-2 text-muted-foreground" />
                  <span>Max: {house.maxOccupancy} guests</span>
                </div>
                <div className="flex items-center">
                  <DollarSignIcon size={16} className="mr-2 text-muted-foreground" />
                  <span>${house.pricePerNight}/night</span>
                </div>
              </div>
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-1">Amenities:</h4>
                <div className="flex flex-wrap gap-1">
                  {house.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-xs bg-muted px-2 py-1 rounded">
                      <SquareAsteriskIcon size={12} className="mr-1" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button 
                className="w-full bg-olive hover:bg-olive-dark"
                onClick={() => handleBookNow(house)}
                disabled={house.status !== 'available'}
              >
                {house.status === 'available' ? 'Book Now' : 'Not Available'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedHouse && (
        <UserBookingFormDialog
          open={bookingDialogOpen}
          onClose={() => setBookingDialogOpen(false)}
          onSubmit={handleBookingSubmit}
          defaultHouseId={selectedHouse.id}
        />
      )}
    </>
  );
};

export default UserHousesSection;
