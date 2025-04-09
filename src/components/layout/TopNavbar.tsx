import React, { useState } from 'react';
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
  MenuIcon,
  XIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const TopNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const menuItems = [
    { path: '/', icon: <HomeIcon size={18} />, title: 'Dashboard' },
    { path: '/bookings', icon: <CalendarIcon size={18} />, title: 'Bookings' },
    { path: '/houses', icon: <HomeIcon size={18} />, title: 'Houses' },
    { path: '/guests', icon: <UsersIcon size={18} />, title: 'Guests' },
    { path: '/payments', icon: <CreditCardIcon size={18} />, title: 'Payments' },
    { path: '/reports', icon: <BarChart2Icon size={18} />, title: 'Reports' },
    { path: '/messages', icon: <MessageSquareIcon size={18} />, title: 'Messages' },
    { path: '/settings', icon: <SettingsIcon size={18} />, title: 'Settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="bg-[#303307] border-b border-olive-light/20 shadow-sm fixed w-full top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-white mr-8">
              Great Xcape Ghana
            </h2>
            
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                {menuItems.map((item) => (
                  <NavigationMenuItem key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors",
                        location.pathname === item.path
                          ? "bg-olive-light/20 text-white"
                          : "text-olive-light/80 hover:bg-olive-light/10 hover:text-white"
                      )}
                    >
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          
          <div className="hidden md:block">
            <Button 
              variant="ghost" 
              className="text-olive-light/80 hover:bg-olive-light/10 hover:text-white"
              onClick={handleLogout}
            >
              <LogOutIcon size={16} className="mr-2" />
              Log Out
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost"
              className="text-white" 
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 pt-16 bg-[#303307]">
          <div className="p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'bg-olive-light/20 text-white'
                        : 'text-olive-light/80 hover:bg-olive-light/10 hover:text-white'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.title}
                  </Link>
                </li>
              ))}
              <li className="pt-4 mt-4 border-t border-olive-light/20">
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-center transition-colors text-olive-light/80 hover:bg-olive-light/10 hover:text-white"
                  onClick={handleLogout}
                >
                  <LogOutIcon size={16} className="mr-2" />
                  Log Out
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Add padding to content below navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default TopNavbar;
