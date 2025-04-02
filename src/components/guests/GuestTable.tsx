
import React, { useState } from 'react';
import { Guest } from '@/lib/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontalIcon, 
  EyeIcon, 
  EditIcon, 
  TrashIcon,
  FileTextIcon
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface GuestTableProps {
  guests: Guest[];
  onViewGuest: (id: string) => void;
  onEditGuest: (id: string) => void;
  onDeleteGuest: (id: string) => void;
  onViewBookingHistory: (id: string) => void;
}

const GuestTable = ({ 
  guests, 
  onViewGuest, 
  onEditGuest, 
  onDeleteGuest,
  onViewBookingHistory
}: GuestTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGuests, setFilteredGuests] = useState(guests);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredGuests(guests);
    } else {
      const filtered = guests.filter(guest => 
        `${guest.firstName} ${guest.lastName}`.toLowerCase().includes(term) || 
        guest.email.toLowerCase().includes(term) || 
        guest.phone.toLowerCase().includes(term)
      );
      setFilteredGuests(filtered);
    }
  };

  React.useEffect(() => {
    setFilteredGuests(guests);
  }, [guests]);

  return (
    <div>
      <div className="mb-4">
        <Input
          placeholder="Search guests..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No guests found</TableCell>
              </TableRow>
            ) : (
              filteredGuests.map((guest) => (
                <TableRow key={guest.id}>
                  <TableCell>{guest.firstName} {guest.lastName}</TableCell>
                  <TableCell>{guest.email}</TableCell>
                  <TableCell>{guest.phone}</TableCell>
                  <TableCell className="truncate max-w-[200px]">{guest.address}</TableCell>
                  <TableCell>{guest.bookingHistory.length}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontalIcon size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[160px]">
                        <DropdownMenuItem onClick={() => onViewGuest(guest.id)}>
                          <EyeIcon size={14} className="mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEditGuest(guest.id)}>
                          <EditIcon size={14} className="mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onViewBookingHistory(guest.id)}>
                          <FileTextIcon size={14} className="mr-2" /> Bookings
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDeleteGuest(guest.id)}>
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

export default GuestTable;
