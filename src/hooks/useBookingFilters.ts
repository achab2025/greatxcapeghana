
import { useState, useMemo } from 'react';
import { Booking } from '@/lib/types';

export const useBookingFilters = (bookings: Booking[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined);
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined);
  const [sortBy, setSortBy] = useState('checkInDate-desc');

  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (searchTerm) count++;
    if (statusFilter !== 'all') count++;
    if (paymentFilter !== 'all') count++;
    if (dateFrom) count++;
    if (dateTo) count++;
    return count;
  }, [searchTerm, statusFilter, paymentFilter, dateFrom, dateTo]);

  const filteredAndSortedBookings = useMemo(() => {
    let filtered = [...bookings];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(booking =>
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.houseName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.bookingStatus === statusFilter);
    }

    // Payment filter
    if (paymentFilter !== 'all') {
      filtered = filtered.filter(booking => booking.paymentStatus === paymentFilter);
    }

    // Date filters
    if (dateFrom) {
      filtered = filtered.filter(booking => 
        new Date(booking.checkInDate) >= dateFrom
      );
    }

    if (dateTo) {
      filtered = filtered.filter(booking => 
        new Date(booking.checkInDate) <= dateTo
      );
    }

    // Sorting
    const [sortField, sortDirection] = sortBy.split('-');
    filtered.sort((a, b) => {
      let aValue: any = a[sortField as keyof Booking];
      let bValue: any = b[sortField as keyof Booking];

      if (sortField === 'checkInDate') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortField === 'totalAmount') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [bookings, searchTerm, statusFilter, paymentFilter, dateFrom, dateTo, sortBy]);

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setPaymentFilter('all');
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    paymentFilter,
    setPaymentFilter,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    sortBy,
    setSortBy,
    activeFiltersCount,
    filteredAndSortedBookings,
    clearFilters
  };
};
