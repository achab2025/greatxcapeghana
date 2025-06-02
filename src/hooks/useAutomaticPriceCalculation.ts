
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { House } from '@/lib/types';

export const useAutomaticPriceCalculation = (
  form: UseFormReturn<any>,
  availableHouses: House[]
) => {
  useEffect(() => {
    const houseId = form.watch('houseId');
    const checkIn = form.watch('checkInDate');
    const checkOut = form.watch('checkOutDate');
    
    if (houseId && checkIn && checkOut) {
      const house = availableHouses.find(h => h.id === houseId);
      if (house) {
        const startDate = new Date(checkIn);
        const endDate = new Date(checkOut);
        const timeDiff = endDate.getTime() - startDate.getTime();
        const nightsCount = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        if (nightsCount > 0) {
          const baseTotal = house.pricePerNight * nightsCount;
          form.setValue('totalAmount', baseTotal);
          console.log(`💰 PRICE CALC: ${nightsCount} nights × $${house.pricePerNight} = $${baseTotal}`);
        }
      }
    }
  }, [form.watch('houseId'), form.watch('checkInDate'), form.watch('checkOutDate'), availableHouses, form]);
};
