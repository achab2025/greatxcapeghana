
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Booking } from '@/lib/types';
import { useNavigate } from 'react-router-dom';

interface UserStayCardProps {
  userBookings: Booking[];
}

const UserStayCard = ({ userBookings }: UserStayCardProps) => {
  const navigate = useNavigate();
  
  return (
    <Card className="border border-olive/20 shadow-md">
      <CardHeader className="bg-gradient-to-r from-olive-light/10 to-olive/10 border-b border-olive/20">
        <CardTitle className="text-olive-dark">Your Upcoming Stays</CardTitle>
      </CardHeader>
      <CardContent className="bg-white p-4">
        {userBookings.length > 0 ? (
          <div className="space-y-4">
            {userBookings.filter(b => b.bookingStatus === 'confirmed').slice(0, 3).map(booking => (
              <div key={booking.id} className="p-4 bg-olive-light/10 rounded-lg border border-olive/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-olive-dark">{booking.houseName}</h3>
                    <p className="text-sm text-olive/70">
                      {new Date(booking.checkInDate).toLocaleDateString()} - {new Date(booking.checkOutDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge className="bg-olive hover:bg-olive-dark">Confirmed</Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-olive/70">
            <p>No upcoming stays</p>
            <Button 
              variant="outline" 
              className="mt-4 border-olive text-olive hover:bg-olive/10"
              onClick={() => navigate("/houses")}
            >
              Browse Accommodations
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserStayCard;
