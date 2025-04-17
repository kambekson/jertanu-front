import { useState, useEffect } from 'react';
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
      price: 37990,
    },
    {
      id: 2,
      name: 'Пакет "Стандарт"',
      duration: '6 месяцев',
      features: ['Постинг в соц.сетях', 'Постинг на главной странице'],
      price: 70990,
    },
    {
      id: 3,
      name: 'Пакет "Премиум"',
      duration: '12 месяцев',
      features: [
        'Постинг в соц.сетях',
        'Постинг на главной странице',
        'Постинг в разделе "Рекомендации"',
        'Система бонусов за отзывы под вашими турами',
      ],
      price: 92990,
    },
  ];

  const activeAds: ActiveAd[] = [
    {
      id: 1,
      package: 'Стандарт',
      expiryDate: 'май 2025',
      reach: 1496,
    },
  ];

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto py-4 px-2">
        <div className="flex flex-col md:flex-row">
          {/* Левая боковая панель */}
          <AgencySidebar />

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
                      <th className="text-center px-4 py-4 text-gray-600 font-bold">
                        Срок действия
                      </th>
                      <th className="text-center px-4 py-4 text-gray-600 font-bold">Охват</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeAds.length > 0 ? (
                      activeAds.map((ad) => (
                        <tr key={ad.id} className="border-b border-gray-200">
                          <td className="text-center px-4 py-4 text-gray-600">{ad.package}</td>
                          <td className="text-center px-4 py-4 text-gray-600">{ad.expiryDate}</td>
                          <td className="text-center px-4 py-4 text-gray-600">
                            {ad.reach.toLocaleString()}
                          </td>
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
                  <div
                    key={pkg.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col"
                  >
                    <div className="p-4 font-medium text-center border-b border-gray-200">
                      {pkg.name}
                    </div>

                    <div className="p-5 flex-grow border-b border-gray-200">
                      <h3 className="text-sm font-medium text-gray-600 mb-2">Детали</h3>

                      <div className="text-sm mb-4">
                        <p className="mb-1">{pkg.duration}</p>
                        {pkg.features.map((feature, index) => (
                          <p key={index} className="mb-1">
                            {feature}
                          </p>
                        ))}
                      </div>

                      <div className="bg-gray-100 p-2 rounded flex justify-between items-center mt-4">
                        <span className="text-gray-700 font-medium">Стоимость</span>
                        <span className="text-orange-500 font-medium">
                          {pkg.price.toLocaleString()} ₸
                        </span>
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
