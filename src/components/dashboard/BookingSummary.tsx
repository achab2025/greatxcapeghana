
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BookingSummaryProps {
  totalBookings: number;
  completedBookings: number;
  upcomingBookings: number;
  cancelledBookings: number;
}

const BookingSummary = ({ 
  totalBookings, 
  completedBookings, 
  upcomingBookings, 
  cancelledBookings 
}: BookingSummaryProps) => {
  const completedPercentage = (completedBookings / totalBookings) * 100;
  const upcomingPercentage = (upcomingBookings / totalBookings) * 100;
  const cancelledPercentage = (cancelledBookings / totalBookings) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Summary</CardTitle>
        <CardDescription>Overview of all booking statuses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Completed</span>
              <span className="text-sm text-muted-foreground">{completedBookings}</span>
            </div>
            <Progress value={completedPercentage} className="h-2 bg-slate-200" indicatorColor="bg-green-500" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Upcoming</span>
              <span className="text-sm text-muted-foreground">{upcomingBookings}</span>
            </div>
            <Progress value={upcomingPercentage} className="h-2 bg-slate-200" indicatorColor="bg-blue-500" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Cancelled</span>
              <span className="text-sm text-muted-foreground">{cancelledBookings}</span>
            </div>
            <Progress value={cancelledPercentage} className="h-2 bg-slate-200" indicatorColor="bg-red-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
