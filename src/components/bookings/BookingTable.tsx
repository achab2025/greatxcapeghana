
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
import { Input } from "@/components/ui/input";

interface BookingTableProps {
  bookings: Booking[];
  onViewBooking: (id: string) => void;
  onEditBooking: (id: string) => void;
  onDeleteBooking: (id: string) => void;
}

const BookingTable = ({ 
  bookings, 
  onViewBooking, 
  onEditBooking, 
  onDeleteBooking 
}: BookingTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBookings, setFilteredBookings] = useState(bookings);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(booking => 
        booking.guestName.toLowerCase().includes(term) || 
        booking.houseName.toLowerCase().includes(term)
      );
      setFilteredBookings(filtered);
    }
  };

  React.useEffect(() => {
    setFilteredBookings(bookings);
  }, [bookings]);

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
    <div>
      <div className="mb-4">
        <Input
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
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
            {filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">No bookings found</TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking) => (
                <TableRow key={booking.id}>
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
    </div>
  );
};

export default BookingTable;
