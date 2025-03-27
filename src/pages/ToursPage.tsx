import toursHero from '../assets/toursHero.jpg';
import TourSearchBar from '../components/UI/TourSearchBar';
import { useState, useEffect } from 'react';
import { TourCardLarge } from '../components/UI/TourCardLarge';

// Типы данных для туров
type Tour = {
  id: number;
  title: string;
  image: string;
  price: number;
  isFamilyFriendly: boolean;
  departureDates: string[];
  features: string[];
  rating: number;
  reviewCount: number;
  hotelStar: number;
  location: string;
  duration: string;
  remaining?: number;
};

// Демо-данные для туров
const tours: Tour[] = [
  {
    id: 1,
    title: 'Italy in 21 days',
    image: 'https://picsum.photos/400/300?random=1',
    price: 7500,
    isFamilyFriendly: true,
    departureDates: [
      'Jan 5, 2025',
      'April 24, 2025',
      'May 12, 2025',
      'June 7, 2025',
      'July 20, 2025',
    ],
    features: ['hotel', 'flight', 'transfer', 'meal'],
    rating: 4.6,
    reviewCount: 45,
    hotelStar: 5,
    location: 'Artemide',
    duration: '20 Nights and 21 Days',
    remaining: 6,
  },
  {
    id: 2,
    title: 'Santorini',
    image: 'https://picsum.photos/400/300?random=2',
    price: 1250,
    isFamilyFriendly: false,
    departureDates: ['Jan 5, 2025', 'Aug 24, 2025', 'Sep 15, 2025'],
    features: ['hotel', 'flight', 'transfer', 'meal'],
    rating: 4.8,
    reviewCount: 380,
    hotelStar: 5,
    location: 'Sheraton',
    duration: '5 Nights and 4 Days',
  },
  {
    id: 3,
    title: 'Spain',
    image: 'https://picsum.photos/400/300?random=3',
    price: 7500,
    isFamilyFriendly: true,
    departureDates: ['Jan 5, 2025', 'Aug 24, 2025', 'Sep 10, 2025'],
    features: ['hotel', 'flight', 'transfer', 'meal'],
    rating: 4.6,
    reviewCount: 45,
    hotelStar: 4,
    location: 'Aqua Luxury suits',
    duration: '6 Nights and 7 Days',
    remaining: 15,
  },
  {
    id: 4,
    title: 'Prague',
    image: 'https://picsum.photos/400/300?random=4',
    price: 7500,
    isFamilyFriendly: false,
    departureDates: ['Jan 5, 2025', 'Aug 24, 2025', 'Sep 20, 2025'],
    features: ['hotel', 'flight', 'transfer', 'meal'],
    rating: 4.6,
    reviewCount: 45,
    hotelStar: 4,
    location: 'Aqua Luxury suits',
    duration: '6 Nights and 7 Days',
    remaining: 2,
  },
  {
    id: 5,
    title: 'London',
    image: 'https://picsum.photos/400/300?random=5',
    price: 7500,
    isFamilyFriendly: true,
    departureDates: ['Jan 5, 2025', 'Aug 24, 2025', 'Oct 15, 2025'],
    features: ['hotel', 'flight', 'transfer'],
    rating: 4.6,
    reviewCount: 45,
    hotelStar: 4,
    location: 'Aqua Luxury suits',
    duration: '6 Nights and 7 Days',
  },
  {
    id: 6,
    title: 'Austria',
    image: 'https://picsum.photos/400/300?random=6',
    price: 7500,
    isFamilyFriendly: true,
    departureDates: ['Jan 5, 2025', 'Aug 24, 2025', 'Nov 10, 2025'],
    features: ['hotel', 'flight', 'meal'],
    rating: 4.6,
    reviewCount: 45,
    hotelStar: 4,
    location: 'Aqua Luxury suits',
    duration: '6 Nights and 7 Days',
  },
];

// Массив фильтров для отображения
const tourFilters = [
    { id: 'filter1', label: 'Этнографические туры' },
    { id: 'filter2', label: 'На открытом воздухе' },
    { id: 'filter3', label: 'Городская жизнь' },
    { id: 'filter4', label: 'Культурное и наследие' },
    { id: 'filter5', label: 'Для всей семьи' },
    { id: 'filter6', label: 'Роскошь и Эксклюзивность' }
  ];

export default function ToursPage() {
  // Состояния для фильтров
  const [compareToursEnabled, setCompareToursEnabled] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [daysRange, setDaysRange] = useState([3, 21]);
  const [rating, setRating] = useState(0);
  const [accommodationType, setAccommodationType] = useState('any');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>(tours);

  

  // Обработчик изменения фильтров
  const handleFilterChange = (filterId: string) => {
    setSelectedFilters(prevFilters => {
      if (prevFilters.includes(filterId)) {
        return prevFilters.filter(id => id !== filterId);
      } else {
        return [...prevFilters, filterId];
      }
    });
  };

  // Эффект для отслеживания изменений в фильтрах
  useEffect(() => {
    console.log('Выбранные фильтры:', selectedFilters);
    
    // Пример фильтрации туров на основе выбранных фильтров
    let filtered = [...tours];
    
    // Проверка на фильтр "Для всей семьи"
    if (selectedFilters.includes('filter5')) {
      filtered = filtered.filter(tour => tour.isFamilyFriendly);
    }
    
    // Здесь можно добавить другие правила фильтрации
    
    setFilteredTours(filtered);
  }, [selectedFilters]);

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
            {/* Сравнить туры */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Сравнить туры</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={compareToursEnabled}
                    onChange={(e) => setCompareToursEnabled(e.target.checked)}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-600">Сравните туры/миссмисси</p>
              </div>
            </div>

            {/* Фильтровать по */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Фильтровать по</span>
                <button className="text-sm">
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
                    className="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              </div>
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
            </div>

            {/* Цена */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Цена</span>
                <button className="text-sm">
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
                    className="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="от €"
                    className="border rounded-md p-2 w-full text-sm"
                  />
                  <input
                    type="text"
                    placeholder="до €"
                    className="border rounded-md p-2 w-full text-sm"
                  />
                </div>
                <div className="mt-4">
                  <input type="range" min="0" max="10000" className="w-full" />
                </div>
              </div>
            </div>

            {/* Кол-во дней */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Кол-во дней</span>
                <button className="text-sm">
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
                    className="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              </div>
              <div className="mt-2">
                <div className="flex justify-between text-sm">
                  <span>мин: 3 дня</span>
                  <span>21+ дней</span>
                </div>
                <div className="mt-4">
                  <input type="range" min="3" max="21" className="w-full" />
                </div>
              </div>
            </div>

            {/* Выбор рейтинга */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Выбор рейтинга</span>
                <button className="text-sm">
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
                    className="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              </div>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} className="text-xl text-gray-300 hover:text-yellow-400">
                    ★
                  </button>
                ))}
              </div>
            </div>

            {/* Вариант проживания */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Вариант проживания</span>
                <button className="text-sm">
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
                    className="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              </div>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="any"
                    name="accommodation"
                    className="mr-2"
                    checked={accommodationType === 'any'}
                    onChange={() => setAccommodationType('any')}
                  />
                  <label htmlFor="any" className="text-sm">
                    Любой
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="hotels"
                    name="accommodation"
                    className="mr-2"
                    checked={accommodationType === 'hotels'}
                    onChange={() => setAccommodationType('hotels')}
                  />
                  <label htmlFor="hotels" className="text-sm">
                    Отели
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="lodges"
                    name="accommodation"
                    className="mr-2"
                    checked={accommodationType === 'lodges'}
                    onChange={() => setAccommodationType('lodges')}
                  />
                  <label htmlFor="lodges" className="text-sm">
                    Лоджи
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="resorts"
                    name="accommodation"
                    className="mr-2"
                    checked={accommodationType === 'resorts'}
                    onChange={() => setAccommodationType('resorts')}
                  />
                  <label htmlFor="resorts" className="text-sm">
                    Курорты
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="inns"
                    name="accommodation"
                    className="mr-2"
                    checked={accommodationType === 'inns'}
                    onChange={() => setAccommodationType('inns')}
                  />
                  <label htmlFor="inns" className="text-sm">
                    Гостиницы
                  </label>
                </div>
              </div>
            </div>

            {/* Accessibility */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Accessibility</span>
                <button className="text-sm">
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
                    className="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              </div>
              <div className="mt-2 space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" id="wheelchair" className="mr-2" />
                  <label htmlFor="wheelchair" className="text-sm">
                    Wheelchair Accessible
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="serviceAnimal" className="mr-2" />
                  <label htmlFor="serviceAnimal" className="text-sm">
                    Service Animal Friendly
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="listening" className="mr-2" />
                  <label htmlFor="listening" className="text-sm">
                    Assistive Listening Devices
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="restrooms" className="mr-2" />
                  <label htmlFor="restrooms" className="text-sm">
                    Accessible Restrooms
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="audioGuides" className="mr-2" />
                  <label htmlFor="audioGuides" className="text-sm">
                    Audio Guides for the Visually Impaired
                  </label>
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="border-2 border-gray-300 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Guests</span>
                <button className="text-sm">
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
                    className="feather feather-chevron-up"
                  >
                    <polyline points="18 15 12 9 6 15"></polyline>
                  </svg>
                </button>
              </div>
              <div className="mt-2 space-y-4">
                <div>
                  <p className="text-sm mb-1">Adults</p>
                  <p className="text-xs text-gray-500">Age 13+</p>
                  <div className="flex items-center mt-1">
                    <button className="border rounded-md w-8 h-8 flex items-center justify-center">
                      -
                    </button>
                    <span className="mx-4">4</span>
                    <button className="border rounded-md w-8 h-8 flex items-center justify-center">
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm mb-1">Children</p>
                  <p className="text-xs text-gray-500">Age 0-13</p>
                  <div className="flex items-center mt-1">
                    <button className="border rounded-md w-8 h-8 flex items-center justify-center">
                      -
                    </button>
                    <span className="mx-4">1</span>
                    <button className="border rounded-md w-8 h-8 flex items-center justify-center">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Правая колонка с турами */}
          <div className="flex-1">
            {/* Заголовок с количеством и фильтром */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium">Найдено {tours.length} туров</h2>
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
            <div className="flex flex-col gap-4">
              {filteredTours.map((tour) => (
                <TourCardLarge key={tour.id} tour={tour} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
