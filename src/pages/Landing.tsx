
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import UserBookingFormDialog from '@/components/user-bookings/UserBookingFormDialog';
import HouseDetailDialog from '@/components/user-bookings/HouseDetailDialog';
import WordPressBookingIntegration from '@/components/wordpress/WordPressBookingIntegration';
import HeroSection from '@/components/landing/HeroSection';
import HouseCardSection from '@/components/landing/HouseCardSection';
import CTASection from '@/components/landing/CTASection';
import LandingFooter from '@/components/landing/LandingFooter';

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
      <HeroSection 
        showWordPressSection={showWordPressSection}
        setShowWordPressSection={setShowWordPressSection}
      />

      {/* WordPress Houses Section */}
      {showWordPressSection && (
        <section className="py-20 bg-gradient-to-r from-olive-50 to-white border-t border-olive/10">
          <div className="container mx-auto px-6">
            <WordPressBookingIntegration />
          </div>
        </section>
      )}

      <HouseCardSection 
        onBookNow={handleBookNow}
        onViewDetails={handleViewDetails}
      />

      <CTASection />

      <LandingFooter />

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
