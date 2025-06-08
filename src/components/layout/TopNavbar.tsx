import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, X, User, LogOut, Settings, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const TopNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('userToken');
    
    // Redirect to login page
    navigate('/login');
  };
  
  const userRole = localStorage.getItem('userRole') || 'admin';
  
  return (
    <nav className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to={userRole === 'admin' ? '/dashboard' : '/user-dashboard'}>
                <img
                  className="h-8 w-auto"
                  src="/logo.svg"
                  alt="Vacation Rental Manager"
                />
              </Link>
            </div>
            
            <div className="hidden md:flex space-x-1">
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-olive text-white' 
                      : 'text-olive-dark hover:bg-olive-light hover:text-white'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/bookings" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-olive text-white' 
                      : 'text-olive-dark hover:bg-olive-light hover:text-white'
                  }`
                }
              >
                Bookings
              </NavLink>
              <NavLink 
                to="/checkinout" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-olive text-white' 
                      : 'text-olive-dark hover:bg-olive-light hover:text-white'
                  }`
                }
              >
                Check-in/Out
              </NavLink>
              <NavLink 
                to="/houses" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-olive text-white' 
                      : 'text-olive-dark hover:bg-olive-light hover:text-white'
                  }`
                }
              >
                Houses
              </NavLink>
              <NavLink 
                to="/guests" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-olive text-white' 
                      : 'text-olive-dark hover:bg-olive-light hover:text-white'
                  }`
                }
              >
                Guests
              </NavLink>
            </div>
          </div>
          
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="relative mr-2">
              <Bell size={20} />
              <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center p-0 rounded-full">
                3
              </Badge>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/avatar.png" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="-mr-2 flex md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? 'bg-olive text-white'
                  : 'text-olive-dark hover:bg-olive-light hover:text-white'
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/bookings"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? 'bg-olive text-white'
                  : 'text-olive-dark hover:bg-olive-light hover:text-white'
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Bookings
          </NavLink>
          <NavLink
            to="/checkinout"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? 'bg-olive text-white'
                  : 'text-olive-dark hover:bg-olive-light hover:text-white'
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Check-in/Out
          </NavLink>
          <NavLink
            to="/houses"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? 'bg-olive text-white'
                  : 'text-olive-dark hover:bg-olive-light hover:text-white'
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Houses
          </NavLink>
          <NavLink
            to="/guests"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive
                  ? 'bg-olive text-white'
                  : 'text-olive-dark hover:bg-olive-light hover:text-white'
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Guests
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
