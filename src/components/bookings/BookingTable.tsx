
import React, { useState } from 'react';
import { Booking } from '@/lib/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  MoreHorizontalIcon, 
  EyeIcon, 
  EditIcon, 
  TrashIcon 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BookingTableProps {
  bookings: Booking[];
  onViewBooking: (id: string) => void;
  onEditBooking: (id: string) => void;
  onDeleteBooking: (id: string) => void;
  selectedBookings?: string[];
  onSelectBooking?: (id: string, checked: boolean) => void;
  showSelection?: boolean;
}

const BookingTable = ({ 
  bookings, 
  onViewBooking, 
  onEditBooking, 
  onDeleteBooking,
  selectedBookings = [],
  onSelectBooking,
  showSelection = false
}: BookingTableProps) => {
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <Badge className="bg-blue-500">Confirmed</Badge>;
      case 'completed':
        return <Badge className="bg-green-500">Completed</Badge>;
      case 'canceled':
        return <Badge className="bg-red-500">Canceled</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };
  
  const getPaymentBadge = (status: string) => {
    switch(status) {
      case 'paid':
        return <Badge variant="outline" className="border-green-500 text-green-500">Paid</Badge>;
      case 'partial':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Partial</Badge>;
      case 'pending':
        return <Badge variant="outline" className="border-red-500 text-red-500">Pending</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {showSelection && (
              <TableHead className="w-12">
                {/* Individual selection handled in rows */}
              </TableHead>
            )}
            <TableHead>Guest</TableHead>
            <TableHead>House</TableHead>
            <TableHead>Check-in / Check-out</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={showSelection ? 8 : 7} className="text-center">
                No bookings found
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking) => (
              <TableRow key={booking.id}>
                {showSelection && (
                  <TableCell>
                    <Checkbox
                      checked={selectedBookings.includes(booking.id)}
                      onCheckedChange={(checked) => 
                        onSelectBooking?.(booking.id, checked as boolean)
                      }
                    />
                  </TableCell>
                )}
                <TableCell>{booking.guestName}</TableCell>
                <TableCell>{booking.houseName}</TableCell>
                <TableCell className="text-sm">
                  <div>{new Date(booking.checkInDate).toLocaleDateString()}</div>
                  <div>{new Date(booking.checkOutDate).toLocaleDateString()}</div>
                </TableCell>
                <TableCell>${booking.totalAmount}</TableCell>
                <TableCell>{getStatusBadge(booking.bookingStatus)}</TableCell>
                <TableCell>{getPaymentBadge(booking.paymentStatus)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontalIcon size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[160px]">
                      <DropdownMenuItem onClick={() => onViewBooking(booking.id)}>
                        <EyeIcon size={14} className="mr-2" /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditBooking(booking.id)}>
                        <EditIcon size={14} className="mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDeleteBooking(booking.id)}>
                        <TrashIcon size={14} className="mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTable;
