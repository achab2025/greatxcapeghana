
import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useBookingForm } from '@/components/bookings/form/useBookingForm';
import HouseSelect from '@/components/bookings/form/HouseSelect';
import DateRangeFields from '@/components/bookings/form/DateRangeFields';
import { Booking } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from 'react-hook-form';

interface UserBookingFormProps {
  booking?: Booking;
  defaultHouseId?: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const UserBookingForm = ({ booking, defaultHouseId, onSubmit, onCancel }: UserBookingFormProps) => {
  const guestForm = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    }
  });

  const { form, availableHouses, handleSubmit } = useBookingForm((bookingData) => {
    const guestData = guestForm.getValues();
    
    // Generate random login credentials
    const username = `${guestData.firstName.toLowerCase()}${Date.now()}`;
    const password = Math.random().toString(36).slice(-8);
    const guestId = `guest_${Date.now()}`;
    
    const enhancedData = {
      ...bookingData,
      guestId,
      guestName: `${guestData.firstName} ${guestData.lastName}`,
      guestInfo: guestData,
      credentials: {
        username,
        password
      },
      bookingStatus: 'confirmed',
      paymentStatus: 'pending',
    };
    
    onSubmit(enhancedData);
    toast({
      title: "Booking Confirmed!",
      description: "Your booking has been confirmed. Check your receipt for login credentials.",
    });
  }, booking);

  return (
    <Form {...form}>
      <div className="space-y-6">
        {/* Guest Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Guest Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={guestForm.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={guestForm.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={guestForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john.doe@example.com" {...field} required />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={guestForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} required />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={guestForm.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, City, State" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Booking Information Section */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Booking Details</h3>
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="houseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-800">Select Accommodation</FormLabel>
                  <FormControl>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value || defaultHouseId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a house" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableHouses.map(house => (
                          <SelectItem key={house.id} value={house.id}>
                            {house.name} (${house.pricePerNight}/night)
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DateRangeFields form={form} />
            
            {/* Display total amount */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="text-xl font-bold text-blue-600">
                  ${form.watch('totalAmount') || 0}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-2 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Confirm Booking
            </Button>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default UserBookingForm;
