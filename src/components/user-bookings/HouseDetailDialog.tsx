
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { houses } from '@/data/mockData';
import { 
  BedIcon, 
  WifiIcon, 
  CarIcon, 
  UtensilsIcon, 
  TvIcon, 
  AirVentIcon,
  StarIcon,
  MapPinIcon,
  DollarSignIcon
} from 'lucide-react';

interface HouseDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  houseId: string;
}

const HouseDetailDialog = ({ open, onOpenChange, houseId }: HouseDetailDialogProps) => {
  const house = houses.find(h => h.id === houseId);

  if (!house) return null;

  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes('wifi')) return <WifiIcon size={16} />;
    if (amenityLower.includes('parking')) return <CarIcon size={16} />;
    if (amenityLower.includes('kitchen')) return <UtensilsIcon size={16} />;
    if (amenityLower.includes('tv')) return <TvIcon size={16} />;
    if (amenityLower.includes('air')) return <AirVentIcon size={16} />;
    return <StarIcon size={16} />;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-800">
            {house.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Main Image */}
          <div className="relative h-64 md:h-80 overflow-hidden rounded-lg">
            <img 
              src={house.imageUrl} 
              alt={house.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              {house.status === 'available' ? (
                <Badge className="bg-green-500">Available</Badge>
              ) : house.status === 'booked' ? (
                <Badge className="bg-blue-500">Booked</Badge>
              ) : (
                <Badge className="bg-amber-500">Maintenance</Badge>
              )}
            </div>
            <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-lg">
              <div className="flex items-center">
                <DollarSignIcon size={16} className="mr-1" />
                <span className="text-lg font-bold">${house.pricePerNight}</span>
                <span className="text-sm ml-1">/night</span>
              </div>
            </div>
          </div>

          {/* House Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BedIcon className="mr-2" size={20} />
                  Property Details
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Max Occupancy:</span>
                    <span className="font-medium">{house.maxOccupancy} guests</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Price per night:</span>
                    <span className="font-medium text-green-600">${house.pricePerNight}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Status:</span>
                    <Badge variant={house.status === 'available' ? 'default' : 'secondary'}>
                      {house.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location & Contact */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <MapPinIcon className="mr-2" size={20} />
                  Location & Contact
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-slate-600 block">Address:</span>
                    <span className="font-medium">123 Vacation Lane, Paradise City</span>
                  </div>
                  <div>
                    <span className="text-slate-600 block">Check-in:</span>
                    <span className="font-medium">3:00 PM</span>
                  </div>
                  <div>
                    <span className="text-slate-600 block">Check-out:</span>
                    <span className="font-medium">11:00 AM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Description</h3>
              <p className="text-slate-700 leading-relaxed">
                {house.description} This beautiful property offers a perfect getaway experience with 
                stunning views and premium amenities. Whether you're here for a romantic weekend or 
                a family vacation, you'll find everything you need for a memorable stay. The space 
                is thoughtfully designed with comfort and luxury in mind, featuring modern furnishings 
                and high-end finishes throughout.
              </p>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Amenities & Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {house.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-blue-600 mr-2">
                      {getAmenityIcon(amenity)}
                    </span>
                    <span className="text-sm font-medium text-slate-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* House Rules */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">House Rules</h3>
              <div className="space-y-2 text-sm text-slate-700">
                <p>• Check-in: 3:00 PM - 9:00 PM</p>
                <p>• Check-out: 11:00 AM</p>
                <p>• No smoking inside the property</p>
                <p>• Maximum {house.maxOccupancy} guests allowed</p>
                <p>• Quiet hours: 10:00 PM - 8:00 AM</p>
                <p>• Pets allowed with prior approval</p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="px-6"
            >
              Close
            </Button>
            <Button 
              onClick={() => onOpenChange(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              disabled={house.status !== 'available'}
            >
              {house.status === 'available' ? 'Select This House' : 'Not Available'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default HouseDetailDialog;
