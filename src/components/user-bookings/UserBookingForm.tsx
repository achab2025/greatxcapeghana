
import React from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
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

interface UserBookingFormProps {
  booking?: Booking;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const UserBookingForm = ({ booking, onSubmit, onCancel }: UserBookingFormProps) => {
  const { form, availableHouses, handleSubmit } = useBookingForm((data) => {
    // Set user-specific default values
    const enhancedData = {
      ...data,
      // For user bookings, we set some defaults
      bookingStatus: 'pending', // Always pending for initial user submissions
      paymentStatus: 'pending',  // Always pending for initial user submissions
    };
    
    onSubmit(enhancedData);
    toast({
      title: booking ? "Booking Updated" : "Booking Request Submitted",
      description: booking 
        ? "Your booking has been updated successfully." 
        : "Your booking request has been submitted for confirmation.",
    });
  }, booking);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4">
          {/* House selection */}
          <FormField
            control={form.control}
            name="houseId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-800">Select Accommodation</FormLabel>
                <FormControl>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
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
          
          {/* Date range fields */}
          <DateRangeFields form={form} />
          
          {/* Hidden fields that are preset for user bookings */}
          <input type="hidden" {...form.register("guestId")} value={localStorage.getItem("userId") || "guest1"} />
          <input type="hidden" {...form.register("bookingStatus")} value="pending" />
          <input type="hidden" {...form.register("paymentStatus")} value="pending" />
        </div>
        
        <div className="flex items-center justify-end space-x-2">
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
            {booking ? 'Update Booking' : 'Request Booking'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserBookingForm;
