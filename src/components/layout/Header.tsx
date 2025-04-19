import { useEffect, useState, useRef } from 'react';
import AuthModal from '../modals/AuthModal';
import Button from '../../UI/Button';
import logo from '../../assets/jertanu-logo.svg';
import { User, Heart, Calendar, LogOut, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/apiService';

export default function Header() {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFullName, setUserFullName] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isAgencyPage = location.pathname.startsWith('/agency');

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      try {
        console.log('Checking authentication with token');

        // Проверка соответствия типа аккаунта текущей странице
        const isAgencyUser = localStorage.getItem('agency_login') === 'true';
        const isRegularUser = localStorage.getItem('user_type') === 'user';

        // Если пользователь находится на странице не своего типа аккаунта, перенаправляем
        if (isAgencyUser && !isAgencyPage) {
          navigate('/agency');
          return;
        } else if (isRegularUser && isAgencyPage) {
          navigate('/');
          return;
        }

        const userData = await apiService.get('/users/me');
        console.log('User data received:', userData);

        // Сохраняем данные пользователя в localStorage
        localStorage.setItem('user', JSON.stringify(userData));

        // Получение имени из данных профиля как в Profile компоненте
        let firstName = '';
        if (userData.profile?.firstName) {
          firstName = userData.profile.firstName;
        } else if (userData.firstName) {
          firstName = userData.firstName;
        } else if (userData.profile?.companyName) {
          firstName = userData.profile.companyName;
        } else {
          firstName = 'Пользователь';
        }

        setUserFullName(firstName);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLoggedIn(false);
        setUserFullName('');
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
        setIsMobileMenuOpen(false);
      }
    }

    if (isDropdownOpen || isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, isMobileMenuOpen]);

  const handleLogout = () => {
    // Используем функцию logout из authService
    import('./../../services/authService').then((module) => {
      const { authService } = module;
      authService.logout();
      setIsLoggedIn(false);
      setUserFullName('');
      setIsDropdownOpen(false);
      window.location.reload();
    });
  };

  return (
    <header className="py-4 md:py-6 border-b">
      <div className="container flex justify-between items-center border-gray-200 bg-white relative">
        <div className="flex items-center">
          <Link to="/" className="pb-2.5">
            <img src={logo} alt="logo" className="h-8 md:h-auto" />
          </Link>
          {/* Десктопная навигация */}
          <div className="nav hidden md:block ml-4">
            <ul className="flex">
              {!isAgencyPage && (
                <li className="px-2 font-normal font-base">
                  <Link to="/tours">Направления</Link>
                </li>
              )}
              {!isLoggedIn && isAgencyPage && (
                <li className="px-2 font-normal font-base">
                  <Link to="/">Для туристов</Link>
                </li>
              )}
              {!isLoggedIn && !isAgencyPage && (
                <li className="px-2 font-normal font-base">
                  <Link to="/agency">Для турагентств</Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Бургер-меню для мобильных устройств */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Десктопные кнопки авторизации и профиль */}
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
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-2xl py-2 z-50 top-full">
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
                  if (isAgencyPage) {
                    navigate('/agency/register');
                  } else {
                    setAuthMode('register');
                    setAuthOpen(true);
                  }
                }}
                variant="neutral"
              >
                Регистрация
              </Button>
              <Button
                onClick={() => {
                  if (isAgencyPage) {
                    navigate('/agency/login');
                  } else {
                    setAuthMode('login');
                    setAuthOpen(true);
                  }
                }}
                variant="primary"
              >
                Войти
              </Button>
            </div>
          )}
        </div>

        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setAuthOpen(false)}
          initialMode={authMode as 'login' | 'signup' | 'forgot' | 'reset' | 'verify' | 'register'}
        />
      </div>

      {/* Мобильное меню */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-50 pt-20 px-4" ref={mobileMenuRef}>
          <div className="flex flex-col space-y-4">
            {!isAgencyPage && (
              <Link
                to="/tours"
                className="text-lg py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Направления
              </Link>
            )}
            {!isLoggedIn && isAgencyPage && (
              <Link
                to="/"
                className="text-lg py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Для туристов
              </Link>
            )}
            {!isLoggedIn && !isAgencyPage && (
              <Link
                to="/agency"
                className="text-lg py-2 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Для турагентств
              </Link>
            )}

            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="text-lg py-2 border-b border-gray-100 flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span>Профиль</span>
                </Link>
                <Link
                  to="#"
                  className="text-lg py-2 border-b border-gray-100 flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  <span>Избранное</span>
                </Link>
                <Link
                  to="#"
                  className="text-lg py-2 border-b border-gray-100 flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Calendar className="w-5 h-5" />
                  <span>Брони</span>
                </Link>
                <button
                  className="text-lg py-2 text-red-500 flex items-center gap-2"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <LogOut className="w-5 h-5" />
                  <span>Выйти</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (isAgencyPage) {
                      navigate('/agency/register');
                    } else {
                      setAuthMode('register');
                      setAuthOpen(true);
                    }
                  }}
                  variant="neutral"
                  className="w-full"
                >
                  Регистрация
                </Button>
                <Button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (isAgencyPage) {
                      navigate('/agency/login');
                    } else {
                      setAuthMode('login');
                      setAuthOpen(true);
                    }
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
    </header>
  );
}
