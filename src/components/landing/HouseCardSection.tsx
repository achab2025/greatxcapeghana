
import React from 'react';
import { Link } from 'react-router-dom';
import { houses } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BedIcon, DollarSignIcon, ArrowRightIcon, InfoIcon, StarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HouseCardSectionProps {
  onBookNow: (houseId: string) => void;
  onViewDetails: (houseId: string) => void;
}

const HouseCardSection = ({ onBookNow, onViewDetails }: HouseCardSectionProps) => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-olive-50/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-olive-dark">
            Our Beautiful 
            <span className="block text-olive">Collection</span>
          </h2>
          <p className="text-xl text-olive-dark/70 max-w-3xl mx-auto leading-relaxed">
            Each home is carefully selected and designed to provide you with an extraordinary experience. 
            From cozy retreats to luxurious estates, find your perfect match.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {houses.map((house) => (
            <Card key={house.id} className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border-0 shadow-lg bg-white rounded-3xl">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={house.imageUrl} 
                  alt={house.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Status badge */}
                <div className="absolute top-4 right-4">
                  {house.status === 'available' ? (
                    <Badge className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-full">
                      Available
                    </Badge>
                  ) : house.status === 'booked' ? (
                    <Badge className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-full">
                      Booked
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-full">
                      Maintenance
                    </Badge>
                  )}
                </div>

                {/* Details button */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-white/90 border-white/20 text-olive hover:bg-white rounded-full"
                    onClick={() => onViewDetails(house.id)}
                  >
                    <InfoIcon className="mr-2" size={16} />
                    Details
                  </Button>
                </div>

                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center bg-white/90 rounded-full px-3 py-1">
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-sm font-medium">4.9</span>
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-olive-dark group-hover:text-olive transition-colors">
                  {house.name}
                </CardTitle>
                <p className="text-olive-dark/70 line-clamp-2 leading-relaxed">{house.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-olive-dark/70">
                    <BedIcon size={18} className="mr-2 text-olive" />
                    <span className="font-medium">{house.maxOccupancy} guests</span>
                  </div>
                  <div className="flex items-center">
                    <DollarSignIcon size={18} className="mr-1 text-olive" />
                    <span className="text-2xl font-bold text-olive-dark">${house.pricePerNight}</span>
                    <span className="text-olive-dark/70 ml-1">/night</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-olive-dark">Featured Amenities:</h4>
                  <div className="flex flex-wrap gap-2">
                    {house.amenities.slice(0, 3).map((amenity, index) => (
                      <Badge key={index} variant="outline" className="border-olive/30 text-olive bg-olive/5 rounded-full px-3 py-1">
                        {amenity}
                      </Badge>
                    ))}
                    {house.amenities.length > 3 && (
                      <Badge variant="outline" className="border-olive/30 text-olive bg-olive/5 rounded-full px-3 py-1">
                        +{house.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="gap-3 pt-6">
                <Button 
                  variant="outline"
                  className="flex-1 border-2 border-olive/20 text-olive hover:bg-olive/10 rounded-xl py-6"
                  onClick={() => onViewDetails(house.id)}
                >
                  View Details
                </Button>
                <Button 
                  onClick={() => onBookNow(house.id)}
                  className="flex-1 bg-olive hover:bg-olive-dark text-white rounded-xl py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={house.status !== 'available'}
                >
                  {house.status === 'available' ? 'Book Now' : 'Not Available'}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            asChild
            size="lg"
            variant="outline" 
            className="border-2 border-olive text-olive hover:bg-olive hover:text-white px-10 py-6 text-xl rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            <Link to="/houses">
              <ArrowRightIcon className="mr-2" size={20} />
              View All Properties
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HouseCardSection;
