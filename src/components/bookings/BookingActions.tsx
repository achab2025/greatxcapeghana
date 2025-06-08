
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DownloadIcon, 
  MoreHorizontalIcon, 
  CheckIcon, 
  XIcon,
  DollarSignIcon
} from 'lucide-react';
import { Booking } from '@/lib/types';

interface BookingActionsProps {
  selectedBookings: string[];
  onSelectAll: (checked: boolean) => void;
  onSelectBooking: (id: string, checked: boolean) => void;
  onBulkStatusUpdate: (status: string) => void;
  onBulkPaymentUpdate: (status: string) => void;
  onExportBookings: () => void;
  bookings: Booking[];
}

const BookingActions = ({
  selectedBookings,
  onSelectAll,
  onSelectBooking,
  onBulkStatusUpdate,
  onBulkPaymentUpdate,
  onExportBookings,
  bookings
}: BookingActionsProps) => {
  const hasSelection = selectedBookings.length > 0;
  const isAllSelected = selectedBookings.length === bookings.length && bookings.length > 0;

  return (
    <div className="flex items-center justify-between mb-4 p-3 bg-slate-50 rounded-lg border">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            checked={isAllSelected}
            onCheckedChange={onSelectAll}
          />
          <span className="text-sm text-slate-600">
            {hasSelection ? `${selectedBookings.length} selected` : 'Select all'}
          </span>
        </div>

        {hasSelection && (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <CheckIcon size={16} className="mr-1" />
                  Update Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onBulkStatusUpdate('confirmed')}>
                  Mark as Confirmed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkStatusUpdate('completed')}>
                  Mark as Completed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkStatusUpdate('canceled')}>
                  Mark as Canceled
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <DollarSignIcon size={16} className="mr-1" />
                  Update Payment
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onBulkPaymentUpdate('paid')}>
                  Mark as Paid
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkPaymentUpdate('partial')}>
                  Mark as Partial
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onBulkPaymentUpdate('pending')}>
                  Mark as Pending
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-slate-600">
          {bookings.length} total
        </Badge>
        <Button variant="outline" size="sm" onClick={onExportBookings}>
          <DownloadIcon size={16} className="mr-1" />
          Export CSV
        </Button>
      </div>
    </div>
  );
};

export default BookingActions;
