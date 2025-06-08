
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FilterIcon } from 'lucide-react';

interface CheckInOutFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  dateFilter: string;
  onDateFilterChange: (value: string) => void;
  totalBookings: number;
}

const CheckInOutFilters = ({
  statusFilter,
  onStatusFilterChange,
  dateFilter,
  onDateFilterChange,
  totalBookings
}: CheckInOutFiltersProps) => {
  return (
    <Card className="mb-6 border border-slate-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FilterIcon size={16} className="text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Filters:</span>
            </div>
            
            <Select value={statusFilter} onValueChange={onStatusFilterChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="confirmed">Awaiting Check-in</SelectItem>
                <SelectItem value="checked-in">Checked In</SelectItem>
                <SelectItem value="completed">Checked Out</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={onDateFilterChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today's Activity</SelectItem>
                <SelectItem value="checkin-today">Check-ins Today</SelectItem>
                <SelectItem value="checkout-today">Check-outs Today</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Badge variant="outline" className="text-slate-600">
            {totalBookings} bookings
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckInOutFilters;
