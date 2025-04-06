import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, BarChart2, ArrowLeft } from 'lucide-react';

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

interface TopTour {
  name: string;
  region: string;
  sales: number;
  percent: number;
}

interface Region {
  name: string;
  percent: number;
  color: string;
}

export default function Statistics() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
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
  const monthlyData = [
    { month: 'Июнь 2024', value: 125 },
    { month: 'Июль 2024', value: 180 },
    { month: 'Авг 2024', value: 245 },
    { month: 'Сент 2024', value: 210 },
    { month: 'Окт 2024', value: 190 },
    { month: 'Нояб 2024', value: 220 },
    { month: 'Дек 2024', value: 260 },
    { month: 'Янв 2025', value: 235 },
    { month: 'Фев 2025', value: 240 },
    { month: 'Март 2025', value: 280 }
  ];
  
  const topTours: TopTour[] = [
    { name: 'Озеро Кайынды', region: 'Алматинская область', sales: 103, percent: 82 },
    { name: 'Туркестан', region: 'Туркестанская область', sales: 87, percent: 70 },
    { name: 'Чарынский каньон', region: 'Алматинская область', sales: 75, percent: 60 }
  ];
  
  const regions: Region[] = [
    { name: 'Южный Казахстан', percent: 81.57, color: '#4072EE' },
    { name: 'Западный Казахстан', percent: 63.25, color: '#B558F6' },
    { name: 'Центральный Казахстан', percent: 52.95, color: '#FEC400' },
    { name: 'Восточный Казахстан', percent: 47.29, color: '#29CB97' }
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
                  <Link to="/agency/ads" className="flex items-center px-4 py-3 hover:bg-gray-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-gray-600">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    <span>Реклама</span>
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
            {/* Заголовок страницы */}
            <div className="flex items-center mb-4">
              <button 
                className="p-2 rounded-lg hover:bg-gray-200 mr-2"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft size={18} />
              </button>
              <h1 className="text-xl font-bold">Статистика</h1>
            </div>

            {/* Графики и данные */}
            <div className="space-y-6">
              {/* График продаж */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-800">Аналитика продаж</h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">с Июнь 2024</span>
                    <span>по Март 2025</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  {/* Здесь будет график */}
                  <div className="relative h-64 w-full">
                    <div className="absolute inset-0 flex items-end">
                      {monthlyData.map((data, index) => (
                        <div 
                          key={index} 
                          className="flex-1 flex justify-center"
                        >
                          <div 
                            className="w-4/5 bg-blue-500 rounded-t-sm relative group hover:bg-blue-600 transition-all duration-200"
                            style={{ 
                              height: `${(data.value / 300) * 100}%`,
                              maxHeight: '100%'
                            }}
                          >
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              {data.value}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    {monthlyData.map((data, index) => (
                      <div key={index} className="text-center">{data.month.split(' ')[0]}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Лучшие туры */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium text-gray-800">Лучшие туры</h2>
                    <div className="text-sm text-gray-600">Август 2024</div>
                  </div>
                  
                  <div className="space-y-8">
                    {topTours.map((tour, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-200 rounded-full mr-3 overflow-hidden">
                            <img 
                              src={`/images/tour-${index + 1}.jpg`} 
                              alt={tour.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                              }}
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">{tour.name}</h3>
                            <p className="text-xs text-gray-500">{tour.region}</p>
                          </div>
                        </div>
                        
                        <div className="relative w-full h-2 bg-gray-100 rounded">
                          <div 
                            className={`absolute top-0 left-0 h-full rounded ${
                              index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                            }`}
                            style={{ width: `${tour.percent}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span>Приобретено:</span>
                          <span className="font-bold">{tour.sales} раз</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Топ регионов */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-medium text-gray-800">Топ регионов</h2>
                    <div className="text-sm text-gray-600">Август 2024</div>
                  </div>
                  
                  <div className="flex mb-6">
                    <div className="flex flex-col text-xs text-gray-500 space-y-6">
                      <div>0%</div>
                      <div>25%</div>
                      <div>50%</div>
                      <div>75%</div>
                      <div>100%</div>
                    </div>
                    
                    <div className="flex-1 pl-4 relative">
                      {/* Вертикальные линии */}
                      <div className="absolute inset-0 flex justify-between pointer-events-none">
                        {[0, 1, 2, 3, 4].map((_, index) => (
                          <div key={index} className="border-l border-gray-100 h-full"></div>
                        ))}
                      </div>
                      
                      {/* Горизонтальные линии */}
                      <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        {[0, 1, 2, 3, 4].map((_, index) => (
                          <div key={index} className="border-t border-gray-100 w-full"></div>
                        ))}
                      </div>
                      
                      {/* Графики для каждого региона */}
                      <div className="relative h-56 mt-2 mb-4">
                        {regions.map((region, index) => (
                          <div 
                            key={index} 
                            className="absolute bottom-0 h-8 rounded-r-sm flex items-center"
                            style={{ 
                              width: `${region.percent}%`,
                              backgroundColor: region.color,
                              top: `${index * 50}px`
                            }}
                          >
                            <span className="text-white text-xs font-bold ml-2">
                              {region.percent.toFixed(0)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {regions.map((region, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2"
                            style={{ backgroundColor: region.color }}
                          ></div>
                          <span>{region.name}</span>
                        </div>
                        <span className="font-bold">{region.percent.toFixed(2)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 