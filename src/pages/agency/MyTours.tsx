import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, LogOut, Edit, Eye, Trash2 } from 'lucide-react';
import Button from '../../components/UI/Button';
import AgencySidebar from '../../components/layout/AgencySidebar';

interface TourCardProps {
  id: number;
  title: string;
  imageUrl: string;
  price: number;
  isActive: boolean;
  onEdit: (id: number) => void;
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

const TourCard: React.FC<TourCardProps> = ({ 
  id,
  title, 
  imageUrl, 
  price, 
  isActive,
  onEdit
}) => {
  const [expanded, setExpanded] = useState(false);
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
        <button 
          className="flex items-center text-gray-500 text-sm hover:text-gray-700"
          onClick={() => setExpanded(!expanded)}
        >
          <span>Подробнее</span>
          <svg 
            className={`ml-1 w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        
        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600 mb-2">
              Дополнительная информация о туре будет здесь...
            </p>
            <div className="flex gap-2 mt-4">
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
              <Button variant="neutral" className="text-sm text-red-500">
                <Trash2 size={14} className="mr-1" />
                Удалить
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function MyTours() {
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

  // Обработчик для кнопки "Редактировать"
  const handleEditTour = (id: number) => {
    navigate(`/agency/tour/edit/${id}`);
  };

  // Обработчик для кнопки "Добавить"
  const handleAddTour = () => {
    navigate('/agency/tour/add');
  };

  // Временные данные для демонстрации
  const myTours = [
    {
      id: 1,
      title: 'Чарынский каньон',
      imageUrl: 'https://images.unsplash.com/photo-1594059487253-28077a2170c4?q=80&w=1000',
      price: 20900,
      isActive: true
    },
    {
      id: 2,
      title: 'Достопримечательности столицы',
      imageUrl: 'https://images.unsplash.com/photo-1598935898639-81304079b70b?q=80&w=1000',
      price: 100750,
      isActive: true
    },
    {
      id: 3,
      title: 'Озеро Кольсай',
      imageUrl: 'https://images.unsplash.com/photo-1622130557904-50e33fc886f9?q=80&w=1000',
      price: 90900,
      isActive: true
    },
    {
      id: 4,
      title: 'Озеро Кайынды',
      imageUrl: 'https://images.unsplash.com/photo-1573125716783-5268669b8166?q=80&w=1000',
      price: 50890,
      isActive: true
    },
    {
      id: 5,
      title: 'Большой тур в Алматинскую область',
      imageUrl: 'https://images.unsplash.com/photo-1598935898639-81304079b70b?q=80&w=1000',
      price: 69890,
      isActive: false
    }
  ];

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
                >
                  <Plus size={16} className="mr-2" />
                  Добавить
                </Button>
              </div>
              
              <div className="space-y-4">
                {myTours.map(tour => (
                  <TourCard 
                    key={tour.id}
                    id={tour.id}
                    title={tour.title}
                    imageUrl={tour.imageUrl}
                    price={tour.price}
                    isActive={tour.isActive}
                    onEdit={handleEditTour}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 