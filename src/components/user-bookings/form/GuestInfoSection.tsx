
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserIcon } from 'lucide-react';

interface GuestInfoSectionProps {
  guestForm: UseFormReturn<any>;
}

const GuestInfoSection = ({ guestForm }: GuestInfoSectionProps) => {
  const { register, formState: { errors } } = guestForm;

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
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700">
              First Name
            </label>
            <Input 
              id="firstName"
              placeholder="John" 
              {...register('firstName', { required: 'First name is required' })}
              className="border-blue-200 focus:border-blue-400"
            />
            {errors.firstName && (
              <p className="text-sm text-red-600">{errors.firstName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700">
              Last Name
            </label>
            <Input 
              id="lastName"
              placeholder="Doe" 
              {...register('lastName', { required: 'Last name is required' })}
              className="border-blue-200 focus:border-blue-400"
            />
            {errors.lastName && (
              <p className="text-sm text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email Address
          </label>
          <Input 
            id="email"
            type="email" 
            placeholder="john.doe@example.com" 
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="border-blue-200 focus:border-blue-400"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-slate-700">
              Phone Number
            </label>
            <Input 
              id="phone"
              placeholder="+1 (555) 123-4567" 
              {...register('phone', { required: 'Phone number is required' })}
              className="border-blue-200 focus:border-blue-400"
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label htmlFor="address" className="block text-sm font-medium text-slate-700">
              Address
            </label>
            <Input 
              id="address"
              placeholder="123 Main St, City, State" 
              {...register('address')}
              className="border-blue-200 focus:border-blue-400"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestInfoSection;
