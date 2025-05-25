
import React, { useEffect } from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useBookingForm } from '@/components/bookings/form/useBookingForm';
import DateRangeFields from '@/components/bookings/form/DateRangeFields';
import { Booking } from '@/lib/types';
import { toast } from '@/components/ui/use-toast';
import { CalendarIcon, UserIcon, DollarSignIcon, HomeIcon, InfoIcon } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from 'react-hook-form';
import HouseDetailDialog from './HouseDetailDialog';

interface UserBookingFormProps {
  booking?: Booking;
  defaultHouseId?: string;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

const UserBookingForm = ({ booking, defaultHouseId, onSubmit, onCancel }: UserBookingFormProps) => {
  const [showHouseDetail, setShowHouseDetail] = React.useState(false);
  const [selectedHouseForDetail, setSelectedHouseForDetail] = React.useState<string>('');

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

  const selectedHouse = availableHouses.find(h => h.id === form.watch('houseId'));
  const checkInDate = form.watch('checkInDate');
  const checkOutDate = form.watch('checkOutDate');
  const totalAmount = form.watch('totalAmount');

  // Calculate nights
  const nights = React.useMemo(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  }, [checkInDate, checkOutDate]);

  const handleViewDetails = (houseId: string) => {
    setSelectedHouseForDetail(houseId);
    setShowHouseDetail(true);
  };

  return (
    <>
      <div className="space-y-8 max-h-[80vh] overflow-y-auto">
        {/* Guest Information Section */}
        <Card className="border-blue-100 bg-blue-50/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg text-blue-800">
              <UserIcon className="mr-2" size={20} />
              Guest Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={guestForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">First Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="John" 
                        {...field} 
                        required 
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={guestForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Doe" 
                        {...field} 
                        required 
                        className="border-blue-200 focus:border-blue-400"
                      />
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
                  <FormLabel className="text-slate-700">Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="john.doe@example.com" 
                      {...field} 
                      required 
                      className="border-blue-200 focus:border-blue-400"
                    />
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
                    <FormLabel className="text-slate-700">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="+1 (555) 123-4567" 
                        {...field} 
                        required 
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={guestForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-700">Address</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="123 Main St, City, State" 
                        {...field} 
                        className="border-blue-200 focus:border-blue-400"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Booking Details Section */}
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card className="border-green-100 bg-green-50/30">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg text-green-800">
                  <HomeIcon className="mr-2" size={20} />
                  Select Your Accommodation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="houseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700">Choose House</FormLabel>
                      <FormControl>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value || defaultHouseId}
                        >
                          <SelectTrigger className="border-green-200 focus:border-green-400">
                            <SelectValue placeholder="Select your perfect getaway" />
                          </SelectTrigger>
                          <SelectContent className="bg-white border shadow-lg">
                            {availableHouses.map(house => (
                              <SelectItem key={house.id} value={house.id}>
                                <div className="flex items-center justify-between w-full">
                                  <span className="font-medium">{house.name}</span>
                                  <Badge variant="outline" className="ml-2">
                                    ${house.pricePerNight}/night
                                  </Badge>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />

                {selectedHouse && (
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-green-800">{selectedHouse.name}</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(selectedHouse.id)}
                        className="border-green-300 text-green-700 hover:bg-green-100"
                      >
                        <InfoIcon className="mr-1" size={14} />
                        View Details
                      </Button>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{selectedHouse.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Max Guests: {selectedHouse.maxOccupancy}</span>
                      <span className="font-medium text-green-700">${selectedHouse.pricePerNight}/night</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card className="border-purple-100 bg-purple-50/30">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center text-lg text-purple-800">
                  <CalendarIcon className="mr-2" size={20} />
                  Select Your Dates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DateRangeFields form={form} />
                {nights > 0 && (
                  <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">Duration:</span>
                      <span className="font-medium text-purple-700">
                        {nights} {nights === 1 ? 'night' : 'nights'}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Booking Summary */}
            {selectedHouse && nights > 0 && (
              <Card className="border-amber-100 bg-amber-50/30">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center text-lg text-amber-800">
                    <DollarSignIcon className="mr-2" size={20} />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Rate per night:</span>
                      <span>${selectedHouse.pricePerNight}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Number of nights:</span>
                      <span>{nights}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">Total Amount:</span>
                      <span className="text-2xl font-bold text-amber-700">
                        ${totalAmount || 0}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-3 text-lg font-medium"
                disabled={!selectedHouse || nights <= 0 || !guestForm.formState.isValid}
              >
                Confirm Booking
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <HouseDetailDialog
        open={showHouseDetail}
        onOpenChange={setShowHouseDetail}
        houseId={selectedHouseForDetail}
      />
    </>
  );
};

export default UserBookingForm;
