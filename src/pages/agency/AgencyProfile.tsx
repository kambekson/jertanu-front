import { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Edit, LogOut } from 'lucide-react';
import Button from '../../components/UI/Button';
import AgencySidebar from '../../components/layout/AgencySidebar';

interface TourCardProps {
  id: number;
  title: string;
  imageUrl: string;
  rating: number;
  dates: string;
  oldPrice?: number;
  price: number;
  discountPrice?: number;
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
  title, 
  imageUrl, 
  rating, 
  dates, 
  price, 
  discountPrice 
}) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow">
      <div className="relative">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-2 right-2 bg-white rounded-md px-1.5 py-0.5 flex items-center">
          <span className="text-sm font-medium">★ {rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-lg mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{dates}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-900">₸ {price.toLocaleString()}</span>
            {discountPrice && (
              <span className="text-orange-500 text-sm">₸{discountPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AgencyProfile() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  
  // Редирект на "Мои туры" при загрузке профиля агентства
  useEffect(() => {
    navigate('/agency/my-tours');
  }, [navigate]);

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
  const hotTours = [
    {
      id: 1,
      title: 'Священный Туркестан',
      imageUrl: 'https://images.unsplash.com/photo-1598935898639-81304079b70b?q=80&w=1000',
      rating: 4.9,
      dates: '21 - 26 марта',
      price: 490000,
      discountPrice: 399000
    },
    {
      id: 2,
      title: 'Озеро Кольсай',
      imageUrl: 'https://images.unsplash.com/photo-1622130557904-50e33fc886f9?q=80&w=1000',
      rating: 4.7,
      dates: '1 - 2 апреля',
      price: 35000,
      discountPrice: 32000
    },
    {
      id: 3,
      title: 'Озеро Кайынды',
      imageUrl: 'https://images.unsplash.com/photo-1573125716783-5268669b8166?q=80&w=1000',
      rating: 4.2,
      dates: '5 - 6 апреля',
      price: 62000,
      discountPrice: 57000
    },
    {
      id: 4,
      title: 'Чарынский каньон',
      imageUrl: 'https://images.unsplash.com/photo-1594059487253-28077a2170c4?q=80&w=1000',
      rating: 4.9,
      dates: '12 - 14 апреля',
      price: 120000,
      discountPrice: 100000
    },
  ];

  // Возвращаем пустой компонент, так как происходит редирект
  return null;
}

