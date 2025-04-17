import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, LogOut, Plus, X } from 'lucide-react';
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

interface Promo {
  id: number;
  category: string;
  discount: string;
  expiryDate: string;
  code: string;
}

export default function Promos() {
  const [user, setUser] = useState<User | null>(null);
  const [promos, setPromos] = useState<Promo[]>([
    {
      id: 1,
      category: 'Для постоянных пользователей',
      discount: '10%',
      expiryDate: 'май 2025',
      code: 'TOUR25',
    },
    {
      id: 2,
      category: 'Для новых клиентов',
      discount: '5%',
      expiryDate: 'сент 2025',
      code: 'WELCOME25',
    },
    {
      id: 3,
      category: 'Для вип-клиентов',
      discount: '20%',
      expiryDate: 'дек 2025',
      code: 'VIP25',
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newPromo, setNewPromo] = useState<Omit<Promo, 'id'>>({
    category: '',
    discount: '',
    expiryDate: '',
    code: '',
  });

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

  const handleAddPromo = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewPromo({
      category: '',
      discount: '',
      expiryDate: '',
      code: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewPromo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Добавление нового промокода
    const newId = promos.length > 0 ? Math.max(...promos.map((p) => p.id)) + 1 : 1;
    const promoToAdd = {
      id: newId,
      ...newPromo,
    };

    setPromos([...promos, promoToAdd]);
    handleCloseModal();
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto py-4 px-2">
        <div className="flex flex-col md:flex-row">
          {/* Левая боковая панель */}
          <AgencySidebar />

          {/* Основной контент */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-800">Промокоды</h2>
                <Button
                  variant="primary"
                  className="flex items-center gap-2"
                  onClick={handleAddPromo}
                >
                  <Plus size={16} />
                  <span>Добавить</span>
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-gray-200">
                      <th className="text-center px-4 py-4 text-gray-600 font-bold">Категория</th>
                      <th className="text-center px-4 py-4 text-gray-600 font-bold">
                        Размер скидки
                      </th>
                      <th className="text-center px-4 py-4 text-gray-600 font-bold">
                        Срок действия
                      </th>
                      <th className="text-center px-4 py-4 text-gray-600 font-bold">Промокод</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promos.map((promo) => (
                      <tr key={promo.id} className="border-b border-gray-200">
                        <td className="text-center px-4 py-4 text-gray-600">{promo.category}</td>
                        <td className="text-center px-4 py-4 text-gray-600">{promo.discount}</td>
                        <td className="text-center px-4 py-4 text-gray-600">{promo.expiryDate}</td>
                        <td className="text-center px-4 py-4 text-gray-600">{promo.code}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно для добавления промокода */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-gray-900/30">
          <div className="bg-white/90 rounded-lg shadow-xl w-full max-w-md backdrop-blur-md border border-gray-100">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium">Добавление промокода</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Категория
                </label>
                <select
                  id="category"
                  name="category"
                  value={newPromo.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Выберите категорию</option>
                  <option value="Для постоянных пользователей">Для постоянных пользователей</option>
                  <option value="Для новых клиентов">Для новых клиентов</option>
                  <option value="Для вип-клиентов">Для вип-клиентов</option>
                  <option value="Сезонная акция">Сезонная акция</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="discount" className="block text-sm font-medium text-gray-700 mb-1">
                  Размер скидки
                </label>
                <input
                  type="text"
                  id="discount"
                  name="discount"
                  value={newPromo.discount}
                  onChange={handleInputChange}
                  placeholder="Например: 10%"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Срок действия
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={newPromo.expiryDate}
                  onChange={handleInputChange}
                  placeholder="Например: дек 2025"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                  Промокод
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={newPromo.code}
                  onChange={handleInputChange}
                  placeholder="Например: SUMMER25"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Отмена
                </button>
                <Button variant="primary" type="submit">
                  Добавить
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
