import { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthModal from '../modals/AuthModal';
import Button from '../UI/Button';
import logo from '../../assets/jertanu-logo.svg';
import { User, Heart, Calendar, LogOut } from 'lucide-react';

export default function Header() {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [searchParams] = useSearchParams();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFullName, setUserFullName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/api/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = await response.json();
          console.log('Полученные данные пользователя:', userData);
          setUserFullName(userData.profile?.fullName || 'Пользователь');
          setIsLoggedIn(true);
        } catch (error) {
          console.error('Ошибка получения данных пользователя:', error);
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
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
  };

  return (
    <header className="flex justify-between p-4 bg-white relative container">
      <div className="flex items-center">
        <a className="pb-2.5">
          <img src={logo} alt="logo" />
        </a>
        <div className="nav">
          <ul className="flex ">
            <li className="px-2 font-normal font-base">
              <a>Направления</a>
            </li>
            <li className="px-2 font-normal font-base">
              <a>Пакеты</a>
            </li>
          </ul>
        </div>
      </div>

      {isLoggedIn ? (
        <div className="relative" ref={dropdownRef}>
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <span className="font-medium">{userFullName}</span>
            <User className="w-5 h-5" />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl py-2 z-50">
              <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100">
                <User className="w-4 h-4" />
                <span>Профиль</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100">
                <Heart className="w-4 h-4" />
                <span>Избранные туры</span>
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
            variant="secondary"
          >
            Регистрация
          </Button>
          <Button
            onClick={() => {
              setAuthMode('login');
              setAuthOpen(true);
            }}
            variant="primary"
          >
            Войти
          </Button>
        </div>
      )}

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode as 'login' | 'signup' | 'forgot' | 'reset' | 'verify' | 'register'}
      />
    </header>
  );
}
