
import { Booking } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

export const useBookingsBulkOperations = (
  bookingsList: Booking[],
  setBookingsList: React.Dispatch<React.SetStateAction<Booking[]>>,
  selectedBookings: string[],
  setSelectedBookings: React.Dispatch<React.SetStateAction<string[]>>,
  filteredAndSortedBookings: Booking[]
) => {
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedBookings(filteredAndSortedBookings.map(b => b.id));
    } else {
      setSelectedBookings([]);
    }
  };

  const handleSelectBooking = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedBookings([...selectedBookings, id]);
    } else {
      setSelectedBookings(selectedBookings.filter(bid => bid !== id));
    }
  };

  const handleBulkStatusUpdate = (status: string) => {
    setBookingsList(bookingsList.map(booking => 
      selectedBookings.includes(booking.id) 
        ? { ...booking, bookingStatus: status as Booking['bookingStatus'] }
        : booking
    ));
    setSelectedBookings([]);
    toast({
      title: "Bookings Updated",
      description: `${selectedBookings.length} bookings updated to ${status}.`,
    });
  };

  const handleBulkPaymentUpdate = (status: string) => {
    setBookingsList(bookingsList.map(booking => 
      selectedBookings.includes(booking.id) 
        ? { ...booking, paymentStatus: status }
        : booking
    ));
    setSelectedBookings([]);
    toast({
      title: "Payment Status Updated",
      description: `${selectedBookings.length} bookings updated to ${status}.`,
    });
  };

  const handleExportBookings = () => {
    const csvContent = [
      ['Guest Name', 'House', 'Check-in', 'Check-out', 'Amount', 'Status', 'Payment'],
      ...filteredAndSortedBookings.map(booking => [
        booking.guestName,
        booking.houseName,
        booking.checkInDate,
        booking.checkOutDate,
        booking.totalAmount.toString(),
        booking.bookingStatus,
        booking.paymentStatus
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast({
      title: "Export Complete",
      description: "Bookings have been exported successfully.",
    });
  };

  return {
    handleSelectAll,
    handleSelectBooking,
    handleBulkStatusUpdate,
    handleBulkPaymentUpdate,
    handleExportBookings
  };
};
