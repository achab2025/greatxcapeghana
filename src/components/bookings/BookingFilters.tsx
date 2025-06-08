
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, FilterIcon, XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface BookingFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  paymentFilter: string;
  onPaymentFilterChange: (value: string) => void;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  onDateFromChange: (date: Date | undefined) => void;
  onDateToChange: (date: Date | undefined) => void;
  sortBy: string;
  onSortByChange: (value: string) => void;
  onClearFilters: () => void;
  activeFiltersCount: number;
}

const BookingFilters = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  paymentFilter,
  onPaymentFilterChange,
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  sortBy,
  onSortByChange,
  onClearFilters,
  activeFiltersCount
}: BookingFiltersProps) => {
  return (
    <div className="space-y-4 mb-6 p-4 bg-white rounded-lg border border-slate-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FilterIcon size={20} className="text-slate-600" />
          <h3 className="font-semibold text-slate-800">Filters</h3>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary">{activeFiltersCount} active</Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button variant="outline" size="sm" onClick={onClearFilters}>
            <XIcon size={16} className="mr-1" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">
            Search
          </label>
          <Input
            placeholder="Guest name, house..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">
            Status
          </label>
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">
            Payment
          </label>
          <Select value={paymentFilter} onValueChange={onPaymentFilterChange}>
            <SelectTrigger>
              <SelectValue placeholder="All payments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="partial">Partial</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">
            Check-in From
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dateFrom && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateFrom ? format(dateFrom, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateFrom}
                onSelect={onDateFromChange}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 mb-1 block">
            Sort By
          </label>
          <Select value={sortBy} onValueChange={onSortByChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="checkInDate-asc">Check-in (Earliest)</SelectItem>
              <SelectItem value="checkInDate-desc">Check-in (Latest)</SelectItem>
              <SelectItem value="totalAmount-desc">Amount (Highest)</SelectItem>
              <SelectItem value="totalAmount-asc">Amount (Lowest)</SelectItem>
              <SelectItem value="guestName-asc">Guest Name (A-Z)</SelectItem>
              <SelectItem value="guestName-desc">Guest Name (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default BookingFilters;
