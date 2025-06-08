
import React from 'react';
import BookingTable from '@/components/bookings/BookingTable';
import BookingFilters from '@/components/bookings/BookingFilters';
import BookingStats from '@/components/bookings/BookingStats';
import BookingActions from '@/components/bookings/BookingActions';
import BookingsHeader from '@/components/bookings/BookingsHeader';
import BookingFormDialog from '@/components/bookings/BookingFormDialog';
import { useBookingFilters } from '@/hooks/useBookingFilters';
import { useBookingsManagement } from '@/hooks/useBookingsManagement';
import { useBookingsBulkOperations } from '@/hooks/useBookingsBulkOperations';

const Bookings = () => {
  const {
    bookingsList,
    setBookingsList,
    isFormOpen,
    setIsFormOpen,
    currentBooking,
    userRole,
    selectedBookings,
    setSelectedBookings,
    handleViewBooking,
    handleEditBooking,
    handleDeleteBooking,
    handleCreateBooking,
    handleFormSubmit,
    handleFormCancel
  } = useBookingsManagement();
  
  const {
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
  } = useBookingFilters(bookingsList);

  const {
    handleSelectAll,
    handleSelectBooking,
    handleBulkStatusUpdate,
    handleBulkPaymentUpdate,
    handleExportBookings
  } = useBookingsBulkOperations(
    bookingsList,
    setBookingsList,
    selectedBookings,
    setSelectedBookings,
    filteredAndSortedBookings
  );

  const isUser = userRole === "user";

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 relative">
      <div className="flex-1 p-8 z-10">
        <BookingsHeader isUser={isUser} onCreateBooking={handleCreateBooking} />

        {!isUser && <BookingStats bookings={bookingsList} />}

        <BookingFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          paymentFilter={paymentFilter}
          onPaymentFilterChange={setPaymentFilter}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateFromChange={setDateFrom}
          onDateToChange={setDateTo}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          onClearFilters={clearFilters}
          activeFiltersCount={activeFiltersCount}
        />

        {!isUser && (
          <BookingActions
            selectedBookings={selectedBookings}
            onSelectAll={handleSelectAll}
            onSelectBooking={handleSelectBooking}
            onBulkStatusUpdate={handleBulkStatusUpdate}
            onBulkPaymentUpdate={handleBulkPaymentUpdate}
            onExportBookings={handleExportBookings}
            bookings={filteredAndSortedBookings}
          />
        )}
        
        <div className={`bg-white rounded-xl shadow-md border ${isUser ? 'border-blue-100' : 'border-olive/10'} overflow-hidden`}>
          <BookingTable 
            bookings={filteredAndSortedBookings}
            onViewBooking={handleViewBooking}
            onEditBooking={handleEditBooking}
            onDeleteBooking={handleDeleteBooking}
            selectedBookings={selectedBookings}
            onSelectBooking={handleSelectBooking}
            showSelection={!isUser}
          />
        </div>
        
        <BookingFormDialog
          isUser={isUser}
          isFormOpen={isFormOpen}
          setIsFormOpen={setIsFormOpen}
          currentBooking={currentBooking}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      </div>
    </div>
  );
};

export default Bookings;
