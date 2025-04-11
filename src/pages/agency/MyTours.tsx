import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, LogOut, Edit, Eye, Trash2 } from 'lucide-react';
import Button from '../../components/UI/Button';
import AgencySidebar from '../../components/layout/AgencySidebar';
import { apiService } from '../../services/apiService';

interface TourCardProps {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  isActive: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

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

interface Tour {
  id: number;
  title: string;
  imageUrls?: string[] | null;
  price: number;
  isActive: boolean;
}

const TourCard: React.FC<TourCardProps> = ({ 
  id,
  title, 
  imageUrl, 
  price, 
  isActive,
  onEdit,
  onDelete
}) => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow border border-gray-200">
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-8">
            <div className="w-12 h-12 rounded-lg overflow-hidden">
              <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            </div>
            <h3 className="font-medium text-gray-800">{title}</h3>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <span className="text-gray-800 font-medium">₸ {price.toLocaleString()}</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              {isActive ? 'Активный' : 'Не активный'}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <Button 
            variant="neutral" 
            className="text-sm"
            onClick={() => onEdit(id)}
          >
            <Edit size={14} className="mr-1" />
            Редактировать
          </Button>
          <Button variant="neutral" className="text-sm">
            <Eye size={14} className="mr-1" />
            Просмотр
          </Button>
          <Button 
            variant="neutral" 
            className="text-sm text-red-500"
            onClick={() => onDelete(id)}
          >
            <Trash2 size={14} className="mr-1" />
            Удалить
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function MyTours() {
  const [user, setUser] = useState<User | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
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
  
  // Функция для загрузки списка туров
  const fetchTours = async () => {
    try {
      setLoading(true);
      const data = await apiService.get('/tours/agency/my');
      setTours(data);
      setError(null);
    } catch (err) {
      console.error('Ошибка при загрузке туров:', err);
      setError(err instanceof Error ? err.message : 'Произошла ошибка при загрузке туров');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  // Обработчик для кнопки "Редактировать"
  const handleEditTour = (id: number) => {
    navigate(`/agency/tour/edit/${id}`);
  };

  // Обработчик для кнопки "Добавить"
  const handleAddTour = () => {
    navigate('/agency/tour/add');
  };

  // Обработчик для кнопки "Удалить"
  const handleDeleteTour = async (id: number) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот тур?')) {
      return;
    }

    setDeleteLoading(true);
    try {
      console.log('Удаление тура с ID:', id);
      
      // Используем fetch напрямую, чтобы получить полный доступ к ответу
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('Не найден токен авторизации');
      }
      
      // Обратите внимание на исправленный URL - явно указываем полный путь API
      const url = `http://localhost:3000/api/tours/${id}`;
      console.log('Отправка DELETE запроса на URL:', url);
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Статус ответа:', response.status);
      
      if (!response.ok) {
        let errorMessage = `Ошибка сервера: ${response.status}`;
        try {
          const errorText = await response.text();
          console.error('Текст ошибки:', errorText);
          if (errorText) {
            try {
              const errorJson = JSON.parse(errorText);
              errorMessage = errorJson.message || errorMessage;
            } catch {
              errorMessage = `${errorMessage} - ${errorText}`;
            }
          }
        } catch (parseError) {
          console.error('Не удалось прочитать текст ошибки', parseError);
        }
        
        throw new Error(errorMessage);
      }
      
      await fetchTours();
      console.log('Тур успешно удален');
    } catch (err) {
      console.error('Ошибка при удалении тура:', err);
      alert(err instanceof Error ? err.message : 'Произошла ошибка при удалении тура');
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50">
        <div className="container mx-auto py-4 px-2">
          <div className="flex flex-col md:flex-row">
            <AgencySidebar />
            <div className="w-full md:w-3/4">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center">Загрузка туров...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-blue-50">
        <div className="container mx-auto py-4 px-2">
          <div className="flex flex-col md:flex-row">
            <AgencySidebar />
            <div className="w-full md:w-3/4">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-center text-red-500">{error}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto py-4 px-2">
        <div className="flex flex-col md:flex-row">
          {/* Левая боковая панель */}
          <AgencySidebar />
          
          {/* Основной контент */}
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Мои туры</h2>
                <Button 
                  variant="primary"
                  onClick={handleAddTour}
                  disabled={deleteLoading}
                >
                  <Plus size={16} className="mr-2" />
                  Добавить
                </Button>
              </div>
              
              <div className="space-y-4">
                {tours.map(tour => (
                  <TourCard 
                    key={tour.id}
                    id={tour.id}
                    title={tour.title}
                    imageUrl={tour.imageUrls && tour.imageUrls.length > 0 ? tour.imageUrls[0] : 'https://placehold.co/600x400?text=No+Image'}
                    price={tour.price}
                    isActive={tour.isActive}
                    onEdit={handleEditTour}
                    onDelete={handleDeleteTour}
                  />
                ))}
                {tours.length === 0 && (
                  <div className="text-center text-gray-500 py-8">
                    У вас пока нет созданных туров
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 