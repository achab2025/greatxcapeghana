import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { houses } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BedIcon, DollarSignIcon, ArrowRightIcon, InfoIcon, LogInIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import UserBookingFormDialog from '@/components/user-bookings/UserBookingFormDialog';
import HouseDetailDialog from '@/components/user-bookings/HouseDetailDialog';
import WordPressBookingIntegration from '@/components/wordpress/WordPressBookingIntegration';
import { toast } from '@/components/ui/use-toast';

const Landing = () => {
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [showHouseDetail, setShowHouseDetail] = useState(false);
  const [selectedHouseId, setSelectedHouseId] = useState<string>('');
  const [showWordPressSection, setShowWordPressSection] = useState(false);
  const navigate = useNavigate();

  // Check authentication status and redirect if needed
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const userRole = localStorage.getItem("userRole");
    
    if (isAuthenticated) {
      if (userRole === "admin") {
        navigate("/");
      } else if (userRole === "user") {
        navigate("/user-dashboard");
      }
    }
  }, [navigate]);

  const handleBookNow = (houseId: string) => {
    setSelectedHouseId(houseId);
    setShowBookingDialog(true);
  };

  const handleViewDetails = (houseId: string) => {
    setSelectedHouseId(houseId);
    setShowHouseDetail(true);
  };

  const handleBookingSubmit = (data: any) => {
    console.log('New booking:', data);
    // In a real app, this would save to database
    toast({
      title: "Booking Confirmed!",
      description: `Your booking for ${data.houseName} has been confirmed.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-olive-50/50 to-olive-100/70">
      {/* Enhanced Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-olive-dark leading-tight">
              Three House Haven
            </h1>
            <p className="text-xl md:text-2xl text-olive-dark/80 max-w-3xl mx-auto mb-8 leading-relaxed">
              Experience the perfect getaway in our beautifully curated vacation homes. 
              Each property offers a unique atmosphere and premium amenities for an unforgettable stay.
            </p>
            
            {/* Enhanced Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                asChild
                size="lg"
                className="bg-olive hover:bg-olive-dark text-white px-10 py-6 text-lg rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/houses">
                  <ArrowRightIcon className="mr-2" size={20} />
                  Browse All Houses
                </Link>
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-olive text-olive hover:bg-olive hover:text-white px-10 py-6 text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <Link to="/login">
                  <LogInIcon className="mr-2" size={20} />
                  Login to Book Now
                </Link>
              </Button>
            </div>

            {/* Additional Action Button */}
            <div className="mt-8">
              <Button
                onClick={() => setShowWordPressSection(!showWordPressSection)}
                variant="ghost"
                className="text-olive hover:bg-olive/10 px-6 py-3 text-base rounded-md"
              >
                {showWordPressSection ? 'Hide' : 'View'} WordPress Houses
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-olive/10 blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-48 w-96 h-96 rounded-full bg-olive/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-olive-light/10 blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </section>

      {/* WordPress Houses Section */}
      {showWordPressSection && (
        <section className="py-16 bg-white/70 backdrop-blur-sm border-t border-olive/10">
          <div className="container mx-auto px-4">
            <WordPressBookingIntegration />
          </div>
        </section>
      )}

      {/* Enhanced Local Houses Section */}
      <section className="py-20 bg-white/60 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-olive-dark">
              Our Beautiful Houses
            </h2>
            <p className="text-lg text-olive-dark/70 max-w-2xl mx-auto">
              Discover our handpicked collection of premium vacation homes, each designed to provide you with comfort, luxury, and unforgettable memories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {houses.map((house) => (
              <Card key={house.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border border-olive/10 group bg-white/80 backdrop-blur-sm">
                <div className="relative h-48 bg-olive-light/20 overflow-hidden">
                  <img 
                    src={house.imageUrl} 
                    alt={house.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
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
                  <div className="absolute top-3 left-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/90 border-olive/20 text-olive hover:bg-white"
                      onClick={() => handleViewDetails(house.id)}
                    >
                      <InfoIcon className="mr-1" size={14} />
                      Details
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-olive-dark">{house.name}</CardTitle>
                  <p className="text-olive-dark/70 line-clamp-2">{house.description}</p>
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
                    <h4 className="text-sm font-medium mb-2">Top Amenities:</h4>
                    <div className="flex flex-wrap gap-1">
                      {house.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-olive/30 text-olive">
                          {amenity}
                        </Badge>
                      ))}
                      {house.amenities.length > 3 && (
                        <Badge variant="outline" className="text-xs border-olive/30 text-olive">
                          +{house.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button 
                    variant="outline"
                    className="flex-1 border-olive text-olive hover:bg-olive hover:text-white"
                    onClick={() => handleViewDetails(house.id)}
                  >
                    View Details
                  </Button>
                  <Button 
                    onClick={() => handleBookNow(house.id)}
                    className="flex-1 bg-olive hover:bg-olive-dark text-white"
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
              className="border-2 border-olive text-olive hover:bg-olive hover:text-white px-8 py-4 text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/houses">
                View All Details
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-r from-olive to-olive-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Your Next Getaway?</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Book your stay today and experience the comfort and luxury of our premium houses. Create memories that will last a lifetime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              size="lg"
              className="bg-white text-olive hover:bg-olive-light hover:text-olive-dark px-10 py-6 text-lg rounded-lg shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/login">
                <LogInIcon className="mr-2" size={20} />
                Login to Book Now
              </Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-olive px-10 py-6 text-lg rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <Link to="/houses">
                Browse Houses
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-olive-dark text-white/90 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Three House Haven</h3>
              <p className="mb-4 text-white/80 leading-relaxed">
                Providing premium vacation experiences since 2023. Your perfect getaway awaits.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">Contact</h3>
              <div className="space-y-3 text-white/80">
                <p>Email: info@threehousehaven.com</p>
                <p>Phone: (555) 123-4567</p>
                <p>Available 24/7 for assistance</p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/houses" className="text-white/80 hover:text-white transition-colors">Our Houses</Link></li>
                <li><Link to="/login" className="text-white/80 hover:text-white transition-colors">Login</Link></li>
                <li><Link to="#" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="#" className="text-white/80 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/70">&copy; {new Date().getFullYear()} Three House Haven. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <UserBookingFormDialog
        open={showBookingDialog}
        onOpenChange={setShowBookingDialog}
        defaultHouseId={selectedHouseId}
        onSubmit={handleBookingSubmit}
      />

      <HouseDetailDialog
        open={showHouseDetail}
        onOpenChange={setShowHouseDetail}
        houseId={selectedHouseId}
      />
    </div>
  );
};

export default Landing;
