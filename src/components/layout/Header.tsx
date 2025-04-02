import { useEffect, useState, useRef } from 'react';
import AuthModal from '../modals/AuthModal';
import Button from '../UI/Button';
import logo from '../../assets/jertanu-logo.svg';
import { User, Heart, Calendar, LogOut, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFullName, setUserFullName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          console.log('Checking authentication with token');
          const response = await fetch('http://localhost:3000/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            console.error('Authentication check failed:', response.status);
            if (response.status === 401) {
              // Clear tokens on auth failure
              localStorage.removeItem('access_token');
              localStorage.removeItem('refresh_token');
              localStorage.removeItem('token');
              setIsLoggedIn(false);
              return;
            }
          }

          const userData = await response.json();
          console.log('User data received:', userData);
          if (userData.profile && userData.profile.fullName) {
            setUserFullName(userData.profile.fullName);
          } else {
            console.error('Profile or fullName not found in userData:', userData);
            setUserFullName('Пользователь');
          }
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Error checking authentication:', error);
          setIsLoggedIn(false);
        }
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }

    if (isDropdownOpen || mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, mobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <header className="py-3 sm:py-4 md:py-6 border-b">
      <div className="container mx-auto px-4 flex justify-between items-center border-gray-200 bg-white relative">
        <div className="flex items-center">
          <Link to="/" className="pb-2.5">
            <img src={logo} alt="logo" className="h-8 sm:h-10 md:h-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block ml-6">
            <ul className="flex space-x-6">
              <li className="font-normal text-base">
                <Link to="/tours" className="hover:text-blue-600 transition duration-150">Направления</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop Auth Buttons or User Profile */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <div className="relative flex items-center" ref={dropdownRef}>
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-3 cursor-pointer"
              >
                <span className="font-medium">{userFullName}</span>
                <User className="w-5 h-5" />
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-lg shadow-2xl py-2 z-50">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    <User className="w-4 h-4" />
                    <span>Профиль</span>
                  </Link>
                  <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100">
                    <Heart className="w-4 h-4" />
                    <span>Избранное</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100">
                    <Calendar className="w-4 h-4" />
                    <span>Брони</span>
                  </div>
                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100 text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Выйти</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Button
                onClick={() => {
                  setAuthMode('register');
                  setAuthOpen(true);
                }}
                variant="neutral"
                className="text-sm sm:text-base"
              >
                Регистрация
              </Button>
              <Button
                onClick={() => {
                  setAuthMode('login');
                  setAuthOpen(true);
                }}
                variant="primary"
                className="text-sm sm:text-base"
              >
                Войти
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            ref={mobileMenuRef} 
            className="absolute top-full left-0 right-0 bg-white shadow-lg z-50 md:hidden"
          >
            <div className="py-4 px-6">
              <ul className="space-y-4 mb-6">
                <li>
                  <Link 
                    to="/tours" 
                    className="block py-2 hover:text-blue-600 transition duration-150"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Направления
                  </Link>
                </li>
                
              </ul>

              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="px-2 py-3 border-t border-gray-100 font-medium">
                    {userFullName}
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-2 py-3 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>Профиль</span>
                  </Link>
                  <div className="flex items-center gap-2 px-2 py-3 hover:bg-gray-50">
                    <Heart className="w-4 h-4" />
                    <span>Избранное</span>
                  </div>
                  <div className="flex items-center gap-2 px-2 py-3 hover:bg-gray-50">
                    <Calendar className="w-4 h-4" />
                    <span>Брони</span>
                  </div>
                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-2 py-3 hover:bg-gray-50 text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Выйти</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthMode('register');
                      setAuthOpen(true);
                    }}
                    variant="neutral"
                    className="w-full"
                  >
                    Регистрация
                  </Button>
                  <Button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setAuthMode('login');
                      setAuthOpen(true);
                    }}
                    variant="primary"
                    className="w-full"
                  >
                    Войти
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setAuthOpen(false)}
          initialMode={authMode as 'login' | 'signup' | 'forgot' | 'reset' | 'verify' | 'register'}
        />
      </div>
    </header>
  );
}
