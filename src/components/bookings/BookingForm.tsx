
import React, { useState, useEffect } from 'react';
import { Booking, House, Guest } from '@/lib/types';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { houses, guests } from '@/data/mockData';

interface BookingFormProps {
  booking?: Booking;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const BookingForm = ({ booking, onSubmit, onCancel }: BookingFormProps) => {
  const [availableHouses, setAvailableHouses] = useState<House[]>([]);

  const form = useForm({
    defaultValues: {
      houseId: booking?.houseId || '',
      guestId: booking?.guestId || '',
      checkInDate: booking?.checkInDate || '',
      checkOutDate: booking?.checkOutDate || '',
      totalAmount: booking?.totalAmount || 0,
      paymentStatus: booking?.paymentStatus || 'pending',
      bookingStatus: booking?.bookingStatus || 'confirmed'
    }
  });

  // Calculate available houses
  useEffect(() => {
    // In a real app, this would filter based on the date range
    // For now, just filter out houses under maintenance
    const available = houses.filter(house => 
      house.status !== 'maintenance' || 
      (booking && house.id === booking.houseId)
    );
    setAvailableHouses(available);
  }, [booking]);

  // Calculate total amount when house or dates change
  useEffect(() => {
    const houseId = form.watch('houseId');
    const checkInDate = form.watch('checkInDate');
    const checkOutDate = form.watch('checkOutDate');
    
    if (houseId && checkInDate && checkOutDate) {
      const house = houses.find(h => h.id === houseId);
      if (house) {
        const startDate = new Date(checkInDate);
        const endDate = new Date(checkOutDate);
        const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
        
        if (nights > 0) {
          const total = house.pricePerNight * nights;
          form.setValue('totalAmount', total);
        }
      }
    }
  }, [form.watch('houseId'), form.watch('checkInDate'), form.watch('checkOutDate'), form]);

  const handleSubmit = (data: any) => {
    const selectedHouse = houses.find(h => h.id === data.houseId);
    const selectedGuest = guests.find(g => g.id === data.guestId);
    
    if (selectedHouse && selectedGuest) {
      const formattedData = {
        ...data,
        houseName: selectedHouse.name,
        guestName: `${selectedGuest.firstName} ${selectedGuest.lastName}`,
        id: booking?.id || `b${Date.now()}`,
        createdAt: booking?.createdAt || new Date().toISOString().split('T')[0]
      };
      
      onSubmit(formattedData);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="houseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>House</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a house" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableHouses.map(house => (
                      <SelectItem key={house.id} value={house.id}>
                        {house.name} (${house.pricePerNight}/night)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="guestId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Guest</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a guest" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {guests.map(guest => (
                      <SelectItem key={guest.id} value={guest.id}>
                        {guest.firstName} {guest.lastName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="checkInDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check-in Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="checkOutDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Check-out Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="totalAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Amount ($)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} readOnly />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="paymentStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Status</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="partial">Partial</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="bookingStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Booking Status</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {booking ? 'Update Booking' : 'Create Booking'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BookingForm;
