import { House, Guest, Booking, Payment, DashboardSummary } from '../lib/types';

// Mock Houses
export const houses: House[] = [
  {
    id: 'h1',
    name: 'House One',
    description: 'Beautiful villa with panoramic lake views and private dock.',
    maxOccupancy: 6,
    pricePerNight: 350,
    amenities: ['Lake View', 'Hot Tub', 'Fireplace', 'Wi-Fi', 'Kitchen'],
    status: 'available',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h2',
    name: 'House Two',
    description: 'Cozy cabin nestled in the mountains with stunning forest views.',
    maxOccupancy: 4,
    pricePerNight: 275,
    amenities: ['Mountain View', 'Deck', 'Wood Stove', 'Wi-Fi', 'Hiking Trails'],
    status: 'booked',
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'h3',
    name: 'House Three',
    description: 'Charming cottage surrounded by lush gardens and a small pond.',
    maxOccupancy: 2,
    pricePerNight: 225,
    amenities: ['Garden', 'Patio', 'BBQ', 'Wi-Fi', 'Breakfast Included'],
    status: 'maintenance',
    imageUrl: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80'
  }
];

// Mock Guests
export const guests: Guest[] = [
  {
    id: 'g1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '555-123-4567',
    address: '123 Main St, Anytown, USA',
    bookingHistory: ['b1']
  },
  {
    id: 'g2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '555-987-6543',
    address: '456 Oak Ave, Somewhere, USA',
    bookingHistory: ['b2']
  },
  {
    id: 'g3',
    firstName: 'Robert',
    lastName: 'Johnson',
    email: 'robert.johnson@example.com',
    phone: '555-765-4321',
    address: '789 Pine Rd, Nowhere, USA',
    bookingHistory: ['b3']
  }
];

// Mock Bookings
export const bookings: Booking[] = [
  {
    id: 'b1',
    houseId: 'h2',
    houseName: 'Mountain Retreat',
    guestId: 'g1',
    guestName: 'John Doe',
    checkInDate: '2023-05-15',
    checkOutDate: '2023-05-20',
    totalAmount: 1375,
    paymentStatus: 'paid',
    bookingStatus: 'confirmed',
    createdAt: '2023-04-10'
  },
  {
    id: 'b2',
    houseId: 'h1',
    houseName: 'Lakeside Villa',
    guestId: 'g2',
    guestName: 'Jane Smith',
    checkInDate: '2023-06-01',
    checkOutDate: '2023-06-05',
    totalAmount: 1400,
    paymentStatus: 'pending',
    bookingStatus: 'confirmed',
    createdAt: '2023-05-01'
  },
  {
    id: 'b3',
    houseId: 'h3',
    houseName: 'Garden Cottage',
    guestId: 'g3',
    guestName: 'Robert Johnson',
    checkInDate: '2023-04-20',
    checkOutDate: '2023-04-25',
    totalAmount: 1125,
    paymentStatus: 'partial',
    bookingStatus: 'completed',
    createdAt: '2023-03-15'
  },
  {
    id: 'b4',
    houseId: 'h1',
    houseName: 'Lakeside Villa',
    guestId: 'g1',
    guestName: 'John Doe',
    checkInDate: '2023-07-10',
    checkOutDate: '2023-07-15',
    totalAmount: 1750,
    paymentStatus: 'pending',
    bookingStatus: 'confirmed',
    createdAt: '2023-05-30'
  }
];

// Mock Payments
export const payments: Payment[] = [
  {
    id: 'p1',
    bookingId: 'b1',
    amount: 1375,
    paymentDate: '2023-04-15',
    paymentMethod: 'credit_card',
    status: 'successful',
    guestName: 'John Doe',
    houseName: 'Mountain Retreat'
  },
  {
    id: 'p2',
    bookingId: 'b3',
    amount: 500,
    paymentDate: '2023-03-20',
    paymentMethod: 'bank_transfer',
    status: 'successful',
    guestName: 'Robert Johnson',
    houseName: 'Garden Cottage'
  },
  {
    id: 'p3',
    bookingId: 'b3',
    amount: 625,
    paymentDate: '2023-04-25',
    paymentMethod: 'cash',
    status: 'pending',
    guestName: 'Robert Johnson',
    houseName: 'Garden Cottage'
  }
];

// Dashboard Summary
export const dashboardSummary: DashboardSummary = {
  totalBookings: 4,
  availableHouses: 1,
  occupancyRate: 66,
  pendingPayments: 2,
  completedBookings: 1,
  pendingBookings: 0,
  upcomingBookings: 3,
  revenue: {
    current: 2875,
    previous: 1850
  }
};
