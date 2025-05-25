
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserIcon } from 'lucide-react';

interface GuestInfoSectionProps {
  guestForm: UseFormReturn<any>;
}

const GuestInfoSection = ({ guestForm }: GuestInfoSectionProps) => {
  return (
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
  );
};

export default GuestInfoSection;
