
import React from 'react';
import { House } from '@/lib/types';
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { 
  BedIcon, 
  DollarSignIcon,
  SquareAsteriskIcon
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface HouseCardProps {
  house: House;
  onEdit: (house: House) => void;
  onBookNow: (house: House) => void;
}

const HouseCard = ({ house, onEdit, onBookNow }: HouseCardProps) => {
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
    <Card className="overflow-hidden">
      <div className="h-48 bg-muted">
        <img 
          src={house.imageUrl} 
          alt={house.name} 
          className="w-full h-full object-cover" 
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{house.name}</h3>
            <p className="text-sm text-muted-foreground">{house.description}</p>
          </div>
          {getStatusBadge(house.status)}
        </div>
      </CardHeader>
      <CardContent className="p-4">
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
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onEdit(house)}>
          Edit Details
        </Button>
        <Button 
          size="sm" 
          onClick={() => onBookNow(house)}
          disabled={house.status !== 'available'}
        >
          Book Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HouseCard;
