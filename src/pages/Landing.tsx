
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { houses } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BedIcon, DollarSignIcon, ArrowRightIcon, InfoIcon, LogInIcon, StarIcon } from 'lucide-react';
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
    <div className="min-h-screen bg-white">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-olive-50 via-white to-olive-100/30"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-olive/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-olive-light/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-olive/3 to-olive-light/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Main heading */}
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8 text-olive-dark leading-none tracking-tight">
              Three House
              <span className="block text-olive bg-gradient-to-r from-olive to-olive-light bg-clip-text text-transparent">
                Haven
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-olive-dark/70 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
              Discover extraordinary vacation homes where luxury meets comfort. 
              <span className="block mt-2 text-olive">Your perfect escape awaits.</span>
            </p>
            
            {/* Call-to-action buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button
                asChild
                size="lg"
                className="bg-olive hover:bg-olive-dark text-white px-12 py-8 text-xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500 hover:shadow-olive/25"
              >
                <Link to="/login">
                  <LogInIcon className="mr-3" size={24} />
                  Start Your Journey
                </Link>
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-olive text-olive hover:bg-olive hover:text-white px-12 py-8 text-xl rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-500 bg-white/80 backdrop-blur-sm"
              >
                <Link to="/houses">
                  <ArrowRightIcon className="mr-3" size={24} />
                  Explore Houses
                </Link>
              </Button>
            </div>

            {/* Stats section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-olive-dark mb-2">3</div>
                <div className="text-olive-dark/70">Premium Houses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-olive-dark mb-2">5★</div>
                <div className="text-olive-dark/70">Guest Rating</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-olive-dark mb-2">24/7</div>
                <div className="text-olive-dark/70">Support</div>
              </div>
            </div>

            {/* WordPress houses toggle */}
            <div className="mt-16">
              <Button
                onClick={() => setShowWordPressSection(!showWordPressSection)}
                variant="ghost"
                className="text-olive hover:bg-olive/10 px-8 py-4 text-lg rounded-xl"
              >
                {showWordPressSection ? 'Hide' : 'View'} WordPress Collection
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-olive rounded-full flex justify-center">
            <div className="w-1 h-3 bg-olive rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* WordPress Houses Section */}
      {showWordPressSection && (
        <section className="py-20 bg-gradient-to-r from-olive-50 to-white border-t border-olive/10">
          <div className="container mx-auto px-6">
            <WordPressBookingIntegration />
          </div>
        </section>
      )}

      {/* Enhanced Local Houses Section */}
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
                      onClick={() => handleViewDetails(house.id)}
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
                    onClick={() => handleViewDetails(house.id)}
                  >
                    View Details
                  </Button>
                  <Button 
                    onClick={() => handleBookNow(house.id)}
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

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-r from-olive via-olive-dark to-olive text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            Ready for Your
            <span className="block">Perfect Getaway?</span>
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
            Join thousands of happy guests who have experienced the magic of our homes. 
            Your dream vacation is just one click away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Button 
              asChild
              size="lg"
              className="bg-white text-olive hover:bg-olive-light hover:text-olive-dark px-12 py-8 text-xl rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-500"
            >
              <Link to="/login">
                <LogInIcon className="mr-3" size={24} />
                Book Your Stay
              </Link>
            </Button>
            <Button 
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-olive px-12 py-8 text-xl rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-500"
            >
              <Link to="/houses">
                <ArrowRightIcon className="mr-3" size={24} />
                Explore More
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto opacity-80">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-white/80">Happy Guests</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-white/80">Customer Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-white/80">Secure Booking</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">4.9★</div>
              <div className="text-white/80">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-olive-dark text-white/90 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-6 text-white">Three House Haven</h3>
              <p className="mb-6 text-white/80 leading-relaxed text-lg max-w-md">
                Creating unforgettable vacation experiences since 2023. 
                Your perfect getaway is our passion.
              </p>
              <div className="flex space-x-4">
                {/* Social media placeholder icons */}
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-sm">t</span>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                  <span className="text-sm">i</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">Contact</h3>
              <div className="space-y-4 text-white/80">
                <div>
                  <div className="font-medium">Email</div>
                  <div>info@threehousehaven.com</div>
                </div>
                <div>
                  <div className="font-medium">Phone</div>
                  <div>(555) 123-4567</div>
                </div>
                <div>
                  <div className="font-medium">Support</div>
                  <div>Available 24/7</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li><Link to="/houses" className="text-white/80 hover:text-white transition-colors text-lg">Our Houses</Link></li>
                <li><Link to="/login" className="text-white/80 hover:text-white transition-colors text-lg">Login</Link></li>
                <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-lg">About Us</Link></li>
                <li><Link to="#" className="text-white/80 hover:text-white transition-colors text-lg">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/70 text-lg">&copy; {new Date().getFullYear()} Three House Haven. All rights reserved.</p>
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
