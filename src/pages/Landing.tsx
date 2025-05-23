
import React from 'react';
import { houses } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BedIcon, DollarSignIcon, ArrowRightIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/50 to-olive-100/70">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-olive-dark">
              Three House Haven
            </h1>
            <p className="text-xl text-olive-dark/80 max-w-2xl mx-auto">
              Experience the perfect getaway in our beautifully curated vacation homes. 
              Each property offers a unique atmosphere and premium amenities.
            </p>
            <div className="mt-8">
              <Button
                asChild
                className="bg-olive hover:bg-olive-dark text-white px-8 py-6 text-lg rounded-md"
              >
                <Link to="/houses">
                  Browse All Houses <ArrowRightIcon className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-olive/10 blur-3xl"></div>
          <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full bg-olive/5 blur-3xl"></div>
        </div>
      </section>

      {/* Featured Houses Section */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-olive-dark">
            Our Beautiful Houses
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {houses.map((house) => (
              <Card key={house.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg border border-olive/10">
                <div className="relative h-48 bg-olive-light/20">
                  <img 
                    src={house.imageUrl} 
                    alt={house.name} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-3 right-3">
                    {house.status === 'available' ? (
                      <Badge className="bg-green-500 hover:bg-green-600">Available</Badge>
                    ) : house.status === 'booked' ? (
                      <Badge className="bg-blue-500 hover:bg-blue-600">Booked</Badge>
                    ) : (
                      <Badge className="bg-amber-500 hover:bg-amber-600">Maintenance</Badge>
                    )}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-olive-dark">{house.name}</CardTitle>
                  <p className="text-olive-dark/70">{house.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <BedIcon size={16} className="mr-2 text-olive" />
                      <span className="text-sm">{house.maxOccupancy} guests</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSignIcon size={16} className="mr-2 text-olive" />
                      <span className="text-sm font-medium">${house.pricePerNight}/night</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Amenities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {house.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {house.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{house.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    asChild
                    className="w-full bg-olive hover:bg-olive-dark text-white"
                    disabled={house.status !== 'available'}
                  >
                    <Link to={house.status === 'available' ? `/houses` : "#"}>
                      {house.status === 'available' ? 'Book Now' : 'Not Available'}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button 
              asChild
              variant="outline" 
              className="border-olive text-olive hover:bg-olive hover:text-white px-8 py-6 text-lg"
            >
              <Link to="/houses">
                View All Details
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-olive text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready for Your Next Getaway?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your stay today and experience the comfort and luxury of our premium houses.
          </p>
          <Button 
            asChild
            className="bg-white text-olive hover:bg-olive-light hover:text-olive-dark px-8 py-6 text-lg rounded-md"
          >
            <Link to="/login">
              Login to Book Now
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-olive-dark text-white/80 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Three House Haven</h3>
              <p className="mb-4">
                Providing premium vacation experiences since 2023.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact</h3>
              <p className="mb-2">Email: info@threehousehaven.com</p>
              <p className="mb-2">Phone: (555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/houses" className="hover:text-white">Houses</Link></li>
                <li><Link to="/login" className="hover:text-white">Login</Link></li>
                <li><Link to="#" className="hover:text-white">About Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p>&copy; {new Date().getFullYear()} Three House Haven. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
