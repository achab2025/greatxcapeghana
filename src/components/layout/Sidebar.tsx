
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, CalendarIcon, UsersIcon, CreditCardIcon } from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', icon: <HomeIcon size={20} />, title: 'Dashboard' },
    { path: '/houses', icon: <HomeIcon size={20} />, title: 'Houses' },
    { path: '/bookings', icon: <CalendarIcon size={20} />, title: 'Bookings' },
    { path: '/guests', icon: <UsersIcon size={20} />, title: 'Guests' },
    { path: '/payments', icon: <CreditCardIcon size={20} />, title: 'Payments' },
  ];

  return (
    <div className="h-screen w-64 bg-sidebar border-r border-border fixed left-0 top-0">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-primary">Three House Haven</h2>
        <p className="text-sm text-muted-foreground">Management System</p>
      </div>
      <nav className="mt-6">
        <ul className="space-y-2 px-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-3 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-4 left-0 right-0 p-4">
        <div className="text-xs text-muted-foreground text-center">
          <p>Three House Haven</p>
          <p>Version 1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
