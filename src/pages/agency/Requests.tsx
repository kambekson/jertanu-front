import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, BarChart2 } from 'lucide-react';
import Button from '../../components/UI/Button';
import AgencySidebar from '../../components/layout/AgencySidebar';

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

interface Request {
  id: number;
  date: string;
  customer: string;
  phone: string;
  price: number;
  tour: string;
  status: 'paid' | 'unpaid' | 'canceled';
}

export default function Requests() {
  const [activeTab, setActiveTab] = useState<'paid' | 'unpaid' | 'canceled'>('paid');
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
  const requests: Request[] = [
    {
      id: 2505,
      date: '20/02/2025',
      customer: 'Андреева А.',
      phone: '+77003824839',
      price: 54990,
      tour: 'Туркестан',
      status: 'paid',
    },
    {
      id: 2506,
      date: '21/02/2025',
      customer: 'Иванов И.',
      phone: '+77012345678',
      price: 35000,
      tour: 'Кольсай',
      status: 'paid',
    },
    {
      id: 2507,
      date: '22/02/2025',
      customer: 'Петров П.',
      phone: '+77023456789',
      price: 48000,
      tour: 'Бурабай',
      status: 'unpaid',
    },
    {
      id: 2508,
      date: '23/02/2025',
      customer: 'Сидоров С.',
      phone: '+77034567890',
      price: 62000,
      tour: 'Каинды',
      status: 'unpaid',
    },
    {
      id: 2509,
      date: '24/02/2025',
      customer: 'Николаев Н.',
      phone: '+77045678901',
      price: 75000,
      tour: 'Алматы',
      status: 'canceled',
    },
  ];

  // Фильтрация заявок по активному табу
  const filteredRequests = requests.filter((request) => request.status === activeTab);

  // Функция для определения цвета статуса
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'unpaid':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Функция для отображения статуса на русском
  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Оплачен';
      case 'unpaid':
        return 'Не оплачен';
      case 'canceled':
        return 'Отменен';
      default:
        return 'Неизвестно';
    }
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto py-4 px-2">
        <div className="flex flex-col md:flex-row">
          {/* Левая боковая панель */}
          <AgencySidebar />

          {/* Основной контент */}
          <div className="w-full md:w-3/4">
            {/* Переключатель табов */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex bg-gray-100 rounded-lg">
                <button
                  className={`px-4 py-2 rounded-lg text-base font-medium ${activeTab === 'paid' ? 'bg-white text-gray-800 font-bold' : 'bg-transparent text-gray-600'}`}
                  onClick={() => setActiveTab('paid')}
                >
                  Оплаченные
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-base font-medium ${activeTab === 'unpaid' ? 'bg-white text-gray-800 font-bold' : 'bg-transparent text-gray-600'}`}
                  onClick={() => setActiveTab('unpaid')}
                >
                  Неоплаченные
                </button>
                <button
                  className={`px-4 py-2 rounded-lg text-base font-medium ${activeTab === 'canceled' ? 'bg-white text-gray-800 font-bold' : 'bg-transparent text-gray-600'}`}
                  onClick={() => setActiveTab('canceled')}
                >
                  Отмененные
                </button>
              </div>

              <Button
                variant="neutral"
                className="text-blue-600"
                onClick={() => navigate('/agency/statistics')}
              >
                <BarChart2 size={16} className="mr-2" />
                Статистика
              </Button>
            </div>

            {/* Таблица заявок */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-4">
                <h2 className="text-xl font-bold">Заявки</h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-gray-200 font-medium text-gray-600">
                      <th className="px-4 py-3 text-left">ID</th>
                      <th className="px-4 py-3 text-left">Дата</th>
                      <th className="px-4 py-3 text-left">Покупатель</th>
                      <th className="px-4 py-3 text-left">Телефон</th>
                      <th className="px-4 py-3 text-left">Стоимость</th>
                      <th className="px-4 py-3 text-left">Тур</th>
                      <th className="px-4 py-3 text-left">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.length > 0 ? (
                      filteredRequests.map((request) => (
                        <tr key={request.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="px-4 py-4">{request.id}</td>
                          <td className="px-4 py-4">{request.date}</td>
                          <td className="px-4 py-4">{request.customer}</td>
                          <td className="px-4 py-4">{request.phone}</td>
                          <td className="px-4 py-4">{request.price.toLocaleString()} ₸</td>
                          <td className="px-4 py-4">{request.tour}</td>
                          <td className="px-4 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${getStatusColor(request.status)}`}
                            >
                              {getStatusText(request.status)}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                          Нет заявок с таким статусом
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
