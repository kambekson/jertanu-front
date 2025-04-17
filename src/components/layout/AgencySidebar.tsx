import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, LogOut } from 'lucide-react';
import { authService } from '../../services/authService';

interface User {
  id: number;
  email: string;
  role: string;
  profile: {
    companyName: string;
    officialCompanyName: string | null;
    bin: string | null;
    registrationDate: string | null;
    directorFullName: string | null;
    city: string | null;
    contactPerson: string | null;
    phoneNumber: string;
    contactEmail: string | null;
    agencyType: string | null;
    description: string;
    legalAddress: string;
    actualAddress: string | null;
    bankAccount: string | null;
    bankBic: string | null;
    bankName: string | null;
    logo: string | null;
  };
}

const AgencySidebar = () => {
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Загрузка данных пользователя из localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-full md:w-1/4 pr-0 md:pr-4 mb-6 md:mb-0">
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mr-3">
            {user?.profile?.logo ? (
              <img
                src={user.profile.logo}
                alt={user?.profile?.companyName || 'Agency logo'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-2xl font-bold text-gray-500">
                {user?.profile?.companyName?.[0] || 'A'}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-medium text-lg">{user?.profile?.companyName || 'Админ'}</h3>
            <p className="text-sm text-gray-600">{user?.email || 'touragent@gmail.com'}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <h3 className="font-medium text-lg p-4 border-b border-gray-100">Аналитика</h3>
        <ul>
          <li>
            <Link
              to="/agency/hot-tours"
              className={`flex items-center px-4 py-3 ${isActive('/agency/hot-tours') ? 'border-l-4 border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`mr-3 ${isActive('/agency/hot-tours') ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <path d="M12 2v8.5L7.5 14.5" />
                <circle cx="12" cy="14" r="8" />
              </svg>
              <span className={isActive('/agency/hot-tours') ? 'text-blue-600' : ''}>
                Горящие туры
              </span>
              {isActive('/agency/hot-tours') && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto text-blue-600"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/agency/my-tours"
              className={`flex items-center px-4 py-3 ${isActive('/agency/my-tours') ? 'border-l-4 border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`mr-3 ${isActive('/agency/my-tours') ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <path d="M12 2L5 12l7 4 7-4-7-10z" />
                <path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
              </svg>
              <span className={isActive('/agency/my-tours') ? 'text-blue-600' : ''}>Мои туры</span>
              {isActive('/agency/my-tours') && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto text-blue-600"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/agency/requests"
              className={`flex items-center px-4 py-3 ${isActive('/agency/requests') ? 'border-l-4 border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`mr-3 ${isActive('/agency/requests') ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span className={isActive('/agency/requests') ? 'text-blue-600' : ''}>
                Просмотр заявок
              </span>
              {isActive('/agency/requests') && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto text-blue-600"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/agency/ads"
              className={`flex items-center px-4 py-3 ${isActive('/agency/ads') ? 'border-l-4 border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`mr-3 ${isActive('/agency/ads') ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
              <span className={isActive('/agency/ads') ? 'text-blue-600' : ''}>Реклама</span>
              {isActive('/agency/ads') && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto text-blue-600"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/agency/promos"
              className={`flex items-center px-4 py-3 ${isActive('/agency/promos') ? 'border-l-4 border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <Mail
                size={16}
                className={`mr-3 ${isActive('/agency/promos') ? 'text-blue-600' : 'text-gray-600'}`}
              />
              <span className={isActive('/agency/promos') ? 'text-blue-600' : ''}>Промокоды</span>
              {isActive('/agency/promos') && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto text-blue-600"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </Link>
          </li>
          {/* <li>
            <Link 
              to="/agency/calendar" 
              className={`flex items-center px-4 py-3 ${isActive('/agency/calendar') ? 'border-l-4 border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`mr-3 ${isActive('/agency/calendar') ? 'text-blue-600' : 'text-gray-600'}`}>
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span className={isActive('/agency/calendar') ? 'text-blue-600' : ''}>Календарь туров</span>
              {isActive('/agency/calendar') && (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-blue-600">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              )}
            </Link>
          </li> */}
        </ul>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-4">
        <h3 className="font-medium text-lg p-4 border-b border-gray-100">Кабинет</h3>
        <ul>
          <li>
            <Link
              to="/agency/about"
              className={`flex items-center px-4 py-3 ${isActive('/agency/about') ? 'border-l-4 border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`mr-3 ${isActive('/agency/about') ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span className={isActive('/agency/about') ? 'text-blue-600' : ''}>Об агентстве</span>
              {isActive('/agency/about') && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto text-blue-600"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </Link>
          </li>
          <li>
            <Link
              to="/agency/settings"
              className={`flex items-center px-4 py-3 ${isActive('/agency/settings') ? 'border-l-4 border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`mr-3 ${isActive('/agency/settings') ? 'text-blue-600' : 'text-gray-600'}`}
              >
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span className={isActive('/agency/settings') ? 'text-blue-600' : ''}>Настройки</span>
              {isActive('/agency/settings') && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto text-blue-600"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              )}
            </Link>
          </li>
        </ul>

        <button
          className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 border-t border-gray-100"
          onClick={() => {
            authService.logout();
            localStorage.removeItem('user');
            window.location.href = '/agency/login';
          }}
        >
          <LogOut size={16} className="mr-3" />
          <span>Выйти</span>
        </button>
      </div>
    </div>
  );
};

export default AgencySidebar;
