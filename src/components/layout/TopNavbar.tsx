
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  CalendarIcon, 
  UsersIcon, 
  CreditCardIcon, 
  LogOutIcon,
  BarChart2Icon,
  MessageSquareIcon,
  SettingsIcon,
  BedIcon,
  MenuIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const TopNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const menuItems = [
    { path: '/', icon: <HomeIcon size={20} />, title: 'Dashboard' },
    { path: '/bookings', icon: <CalendarIcon size={20} />, title: 'Bookings Management' },
    { path: '/rooms', icon: <BedIcon size={20} />, title: 'Room & Pricing' },
    { path: '/guests', icon: <UsersIcon size={20} />, title: 'Users & Guests' },
    { path: '/payments', icon: <CreditCardIcon size={20} />, title: 'Payment & Transactions' },
    { path: '/reports', icon: <BarChart2Icon size={20} />, title: 'Reports & Analytics' },
    { path: '/messages', icon: <MessageSquareIcon size={20} />, title: 'Messages & Inquiries' },
    { path: '/settings', icon: <SettingsIcon size={20} />, title: 'Settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate('/login');
  };

  return (
    <nav className="bg-[#303307] border-b border-white/10 fixed w-full top-0 left-0 right-0 z-50 px-6 h-16 flex items-center justify-between">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-white mr-8">Great Xcape Ghana Ltd.</h2>
        
        {/* Mobile Menu */}
        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <MenuIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48 bg-[#303307] border-white/10">
              {menuItems.map((item) => (
                <DropdownMenuItem key={item.path} className="focus:bg-[#45491a] text-white">
                  <Link to={item.path} className="flex items-center w-full">
                    <span className="mr-2">{item.icon}</span>
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem className="focus:bg-[#45491a] text-white" onClick={handleLogout}>
                <LogOutIcon size={16} className="mr-2" />
                Log Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center space-x-1">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              location.pathname === item.path
                ? 'bg-[#45491a] text-white'
                : 'text-white/70 hover:bg-[#45491a]/70 hover:text-white'
            }`}
          >
            <span className="hidden md:inline">{item.title}</span>
            <span className="inline md:hidden">{item.icon}</span>
          </Link>
        ))}
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        className="bg-transparent border-white/20 text-white hover:bg-[#45491a]"
        onClick={handleLogout}
      >
        <LogOutIcon size={16} className="mr-2" />
        <span className="hidden sm:inline">Log Out</span>
      </Button>
    </nav>
  );
};

export default TopNavbar;
