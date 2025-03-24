import { useEffect, useState } from 'react';
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

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.reload();
  };

  return (
    <header className="flex justify-between p-4 bg-white relative">
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
        <div className="relative">
          <Button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            variant="secondary"
            className="gap-3"
          >
            <span className="font-medium">{userFullName}</span>
            <User className="w-5 h-5" />
          </Button>
          
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg py-2 z-50">
              <Button variant="secondary" className="w-full px-4 py-2 text-left z-50">
                <User className="w-4 h-4" />
                Профиль
              </Button>
              <Button variant="secondary" className="w-full px-4 py-2 text-left">
                <Heart className="w-4 h-4" />
                Избранные туры
              </Button>
              <Button variant="secondary" className="w-full px-4 py-2 text-left">
                <Calendar className="w-4 h-4" />
                Брони
              </Button>
              <Button 
                onClick={handleLogout}
                variant="danger"
                className="w-full px-4 py-2 text-left"
              >
                <LogOut className="w-4 h-4" />
                Выйти
              </Button>
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
