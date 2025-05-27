
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  HomeIcon, 
  CalendarIcon, 
  CreditCardIcon, 
  LogOutIcon,
  MessageSquareIcon,
  UserIcon,
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

const UserNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const menuItems = [
    { path: '/user-dashboard', icon: <HomeIcon size={18} />, title: 'Dashboard' },
    { path: '/user/bookings', icon: <CalendarIcon size={18} />, title: 'My Bookings' },
    { path: '/user/payments', icon: <CreditCardIcon size={18} />, title: 'Payments' },
    { path: '/user/messages', icon: <MessageSquareIcon size={18} />, title: 'Messages' },
  ];

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="bg-white border-b border-slate-200 shadow-sm fixed w-full top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="flex items-center">
            <h2 className="text-xl font-bold text-slate-800 mr-8">
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
                          ? "bg-slate-100 text-slate-900"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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
          
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-slate-600 flex items-center gap-2 hover:bg-slate-50 hover:text-slate-900"
              onClick={() => navigate('/user/settings')}
            >
              <UserIcon size={16} />
              My Account
            </Button>

            <Button 
              variant="ghost" 
              className="text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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
              className="text-slate-800" 
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 pt-16 bg-white">
          <div className="p-4 overflow-y-auto">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center p-3 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === item.path
                        ? 'bg-slate-100 text-slate-900'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/user/settings"
                  className="flex items-center p-3 text-sm font-medium rounded-md transition-colors text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mr-3"><UserIcon size={18} /></span>
                  My Account
                </Link>
              </li>
              <li className="pt-4 mt-4 border-t border-slate-200">
                <Button 
                  variant="ghost" 
                  className="w-full flex items-center justify-center transition-colors text-slate-600 hover:bg-slate-50 hover:text-slate-900"
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

export default UserNavbar;
