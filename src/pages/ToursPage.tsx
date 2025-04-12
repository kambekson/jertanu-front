import toursHero from '../assets/toursHero.jpg';
import TourSearchBar from '../components/UI/TourSearchBar';
import { useState, useEffect } from 'react';
import { TourCardLarge } from '../components/UI/TourCardLarge';
import { Link } from 'react-router-dom';
import { apiService } from '../services/apiService';

enum TourType {
  ETHNO = 'ethno',
  NATURE = 'nature',
  CULTURAL = 'cultural',
  ADVENTURE = 'adventure',
  GASTRO = 'gastronomy',
  OTHER = 'other'
}

// Типы данных для туров
export type Tour = {
  id: number;
  title: string;
  imageUrls: string;
  price: number;
  discountPrice?: number;
  status: string;
  startDate: string;
  endDate: string;
  city: string;
  type: string;
  isActive: boolean;
  services: string[];
  averageRating: number;
  totalReviews: number;
  maxParticipants: number;
  hotelStar: number;
  location: string;
  duration: string;
};

// Массив фильтров для отображения
const tourFilters = [
  { id: TourType.ETHNO, label: 'Этнографические туры' },
  { id: TourType.NATURE, label: 'Природные туры' },
  { id: TourType.CULTURAL, label: 'Культурные туры' },
  { id: TourType.ADVENTURE, label: 'Приключенческие туры' },
  { id: TourType.GASTRO, label: 'Гастрономические туры' },
  { id: TourType.OTHER, label: 'Другие туры' },
];

export default function ToursPage() {
  // Состояния для фильтров
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  
  // Состояния для сворачивания фильтров
  const [isFilterTypesOpen, setIsFilterTypesOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isDaysOpen, setIsDaysOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);

  // Обработчик изменения фильтров
  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filterId)) {
        return prevFilters.filter((id) => id !== filterId);
      } else {
        return [...prevFilters, filterId];
      }
    });
  };

  // Эффект для отслеживания изменений в фильтрах
  useEffect(() => {
    if (selectedFilters.length === 0) {
      setFilteredTours(tours);
    } else {
      const filtered = tours.filter(tour => selectedFilters.includes(tour.type));
      setFilteredTours(filtered);
    }
  }, [selectedFilters, tours]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const data = await apiService.get('/tours');
        setTours(data);
        setFilteredTours(data);
      } catch (err) {
        console.error('Ошибка при загрузке туров:', err);
        setError('Не удалось загрузить туры. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

 // Если данные загружаются, показываем индикатор загрузки
 if (loading) {
  return <div className="container py-20 text-center">Загрузка туров...</div>;
}

// Если произошла ошибка, показываем сообщение об ошибке
if (error) {
  return <div className="container py-20 text-center text-red-500">{error}</div>;
}

// Если туры не найдены, показываем соответствующее сообщение
if (!tours.length) {
  return <div className="container py-20 text-center">Туры не найдены</div>;
}

  return (
    <div>
      <div className="relative">
        <img src={toursHero} className="h-[204px] w-full object-cover"></img>
        <div className="absolute flex flex-row inset-1 items-center justify-center">
          <TourSearchBar />
        </div>
      </div>
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-row gap-6">
          {/* Левая колонка с фильтрами */}
          <div className="w-64 flex flex-col gap-4">
            {/* Фильтровать по */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Фильтровать по</span>
                <button 
                  className="text-sm" 
                  onClick={() => setIsFilterTypesOpen(!isFilterTypesOpen)}
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
                    className={`feather ${isFilterTypesOpen ? 'feather-chevron-up' : 'feather-chevron-down'}`}
                  >
                    <polyline points={isFilterTypesOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                  </svg>
                </button>
              </div>
              {isFilterTypesOpen && (
                <div className="mt-2 space-y-2">
                  {tourFilters.map((filter) => (
                    <div key={filter.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={filter.id}
                        className="mr-2"
                        checked={selectedFilters.includes(filter.id)}
                        onChange={() => handleFilterChange(filter.id)}
                      />
                      <label htmlFor={filter.id} className="text-sm">
                        {filter.label}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Цена */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Цена</span>
                <button 
                  className="text-sm"
                  onClick={() => setIsPriceOpen(!isPriceOpen)}
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
                    className={`feather ${isPriceOpen ? 'feather-chevron-up' : 'feather-chevron-down'}`}
                  >
                    <polyline points={isPriceOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                  </svg>
                </button>
              </div>
              {isPriceOpen && (
                <div className="mt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="от ₸"
                      className="border rounded-md p-2 w-full text-sm"
                    />
                    <input
                      type="text"
                      placeholder="до ₸"
                      className="border rounded-md p-2 w-full text-sm"
                    />
                  </div>
                  <div className="mt-4">
                    <input type="range" min="0" max="5000000" className="w-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Кол-во дней */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Кол-во дней</span>
                <button 
                  className="text-sm"
                  onClick={() => setIsDaysOpen(!isDaysOpen)}
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
                    className={`feather ${isDaysOpen ? 'feather-chevron-up' : 'feather-chevron-down'}`}
                  >
                    <polyline points={isDaysOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                  </svg>
                </button>
              </div>
              {isDaysOpen && (
                <div className="mt-2">
                  <div className="flex justify-between text-sm">
                    <span>мин: 1 дня</span>
                    <span>21+ дней</span>
                  </div>
                  <div className="mt-4">
                    <input type="range" min="3" max="21" className="w-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Выбор рейтинга */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Выбор рейтинга</span>
                <button 
                  className="text-sm"
                  onClick={() => setIsRatingOpen(!isRatingOpen)}
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
                    className={`feather ${isRatingOpen ? 'feather-chevron-up' : 'feather-chevron-down'}`}
                  >
                    <polyline points={isRatingOpen ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                  </svg>
                </button>
              </div>
              {isRatingOpen && (
                <div className="mt-2 flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="text-xl text-gray-300 hover:text-yellow-400">
                      ★
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Правая колонка с турами */}
          <div className="flex-1">
            {/* Заголовок с количеством и фильтром */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Найдено {filteredTours.length} туров</h2>
              <div className="flex items-center">
                <span className="mr-2 text-sm">Сортировать по</span>
                <select className="border-2 border-gray-300 rounded-md p-2 text-sm">
                  <option>Рекомендуемые</option>
                  <option>Цена: от низкой к высокой</option>
                  <option>Цена: от высокой к низкой</option>
                  <option>Рейтинг</option>
                </select>
              </div>
            </div>

            {/* Карточки туров через map */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center">{error}</div>
            ) : filteredTours.length === 0 ? (
              <div className="text-center text-gray-500">Туры не найдены</div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredTours.map((tour) => (
                  <Link to={`/tour/${tour.id}`} key={tour.id}>
                    <TourCardLarge tour={tour} />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
