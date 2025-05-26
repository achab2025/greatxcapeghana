
import { UseFormReturn } from 'react-hook-form';

export const useBookingValidation = (
  selectedHouse: any,
  nights: number,
  totalAmount: number,
  guestForm: UseFormReturn<any>
) => {
  const isFormValid = selectedHouse && 
                     nights > 0 && 
                     totalAmount > 0 &&
                     guestForm.formState.isValid &&
                     guestForm.watch('firstName') &&
                     guestForm.watch('lastName') &&
                     guestForm.watch('email') &&
                     guestForm.watch('phone');

  return { isFormValid };
};
