import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Volume2 } from 'lucide-react';
import Button from '../../components/UI/Button';

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

interface AdPackage {
  id: number;
  name: string;
  duration: string;
  features: string[];
  price: number;
}

interface ActiveAd {
  id: number;
  package: string;
  expiryDate: string;
  reach: number;
}

export default function Ads() {
  const [user, setUser] = useState<User | null>(null);
  
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

  // Временные данные для демонстрации
  const adPackages: AdPackage[] = [
    {
      id: 1,
      name: 'Пакет "Базовый"',
      duration: '3 месяца',
      features: ['Постинг в соц.сетях'],
      price: 37990
    },
    {
      id: 2,
      name: 'Пакет "Стандарт"',
      duration: '6 месяцев',
      features: ['Постинг в соц.сетях', 'Постинг на главной странице'],
      price: 70990
    },
    {
      id: 3,
      name: 'Пакет "Премиум"',
      duration: '12 месяцев',
      features: [
        'Постинг в соц.сетях',
        'Постинг на главной странице',
        'Постинг в разделе "Рекомендации"',
        'Система бонусов за отзывы под вашими турами'
      ],
      price: 92990
    }
  ];

  const activeAds: ActiveAd[] = [
    {
      id: 1,
      package: 'Стандарт',
      expiryDate: 'май 2025',
      reach: 1496
    }
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto py-4 px-2">
        <div className="flex flex-col md:flex-row">
          {/* Левая боковая панель */}
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
                  <p className="text-sm text-gray-600">{user?.email || 'kaz.touragent@gmail.com'}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <h3 className="font-medium text-lg p-4 border-b border-gray-100">Аналитика</h3>
              <ul>
                <li>
                  <Link to="/agency/hot-tours" className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-gray-600">
                      <path d="M12 2v8.5L7.5 14.5"/>
                      <circle cx="12" cy="14" r="8"/>
                    </svg>
                    <span>Горящие туры</span>
                  </Link>
                </li>
                <li>
                  <Link to="/agency/my-tours" className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-gray-600">
                      <path d="M12 2L5 12l7 4 7-4-7-10z"/>
                      <path d="M5 12v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>
                    </svg>
                    <span>Мои туры</span>
                  </Link>
                </li>
                <li>
                  <Link to="/agency/requests" className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-gray-600">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <span>Просмотр заявок</span>
                  </Link>
                </li>
                <li>
                  <Link to="/agency/ads" className="flex items-center px-4 py-3 border-l-4 border-blue-500 bg-blue-50">
                    <Volume2 size={16} className="mr-3 text-blue-600" />
                    <span className="text-blue-600">Реклама</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto text-blue-600">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link to="/agency/promos" className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-gray-600">
                      <polyline points="9 11 12 14 22 4"/>
                      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                    </svg>
                    <span>Промокоды</span>
                  </Link>
                </li>
                <li>
                  <Link to="/agency/calendar" className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-gray-600">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    <span>Календарь туров</span>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm overflow-hidden mt-4">
              <h3 className="font-medium text-lg p-4 border-b border-gray-100">Кабинет</h3>
              <ul>
                <li>
                  <Link to="/agency/about" className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-gray-600">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    <span>Об агентстве</span>
                  </Link>
                </li>
                <li>
                  <Link to="/agency/settings" className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-gray-600">
                      <circle cx="12" cy="12" r="3"/>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                    </svg>
                    <span>Настройки</span>
                  </Link>
                </li>
              </ul>
              
              <button 
                className="flex items-center w-full px-4 py-3 text-red-500 hover:bg-red-50 border-t border-gray-100"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.href = '/agency/login';
                }}
              >
                <LogOut size={16} className="mr-3" />
                <span>Выйти</span>
              </button>
            </div>
          </div>
          
          {/* Основной контент */}
          <div className="w-full md:w-3/4">
            {/* Активная реклама */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Активная реклама</h2>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-gray-200">
                      <th className="text-center px-4 py-4 text-gray-600 font-bold">Пакет</th>
                      <th className="text-center px-4 py-4 text-gray-600 font-bold">Срок действия</th>
                      <th className="text-center px-4 py-4 text-gray-600 font-bold">Охват</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeAds.length > 0 ? (
                      activeAds.map((ad) => (
                        <tr key={ad.id} className="border-b border-gray-200">
                          <td className="text-center px-4 py-4 text-gray-600">{ad.package}</td>
                          <td className="text-center px-4 py-4 text-gray-600">{ad.expiryDate}</td>
                          <td className="text-center px-4 py-4 text-gray-600">{ad.reach.toLocaleString()}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={3} className="px-4 py-4 text-center text-gray-500">
                          Нет активной рекламы
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Рекламные пакеты */}
            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-800 mb-6">Предложения для вас</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {adPackages.map((pkg) => (
                  <div key={pkg.id} className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 font-medium text-center border-b border-gray-200">
                      {pkg.name}
                    </div>
                    
                    <div className="p-5 flex-grow border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Детали</h3>
                      
                      <div className="text-sm mb-4">
                        <p className="mb-1">{pkg.duration}</p>
                        {pkg.features.map((feature, index) => (
                          <p key={index} className="mb-1">{feature}</p>
                        ))}
                      </div>
                      
                      <div className="bg-gray-100 p-2 rounded flex justify-between items-center mt-4">
                        <span className="text-gray-700 font-medium">Стоимость</span>
                        <span className="text-orange-500 font-medium">{pkg.price.toLocaleString()} ₸</span>
                      </div>
                    </div>
                    
                    <Button
                      variant="primary"
                      className={`w-full rounded-none py-3 ${pkg.id === 3 ? 'bg-orange-500' : ''}`}
                      onClick={() => console.log(`Выбран пакет ${pkg.name}`)}
                    >
                      Подключить
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 