
import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { House } from '@/lib/types';

export const useBookingFormValidation = (
  form: UseFormReturn<any>,
  guestForm: UseFormReturn<any>,
  selectedHouse: House | undefined
) => {
  const checkInDate = form.watch('checkInDate');
  const checkOutDate = form.watch('checkOutDate');
  const totalAmount = form.watch('totalAmount') || 0;

  // Calculate nights
  const nights = useMemo(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 0;
    }
    return 0;
  }, [checkInDate, checkOutDate]);

  // Calculate form validity
  const guestData = guestForm.watch();
  const isGuestFormValid = !!(guestData.firstName && guestData.lastName && guestData.email && guestData.phone);
  const isFormValid = !!(selectedHouse && nights > 0 && totalAmount > 0 && isGuestFormValid);

  return {
    nights,
    isGuestFormValid,
    isFormValid,
    guestData,
    totalAmount
  };
};
