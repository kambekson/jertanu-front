import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import { serviceOptions } from '../../data/serviceOptions';
import { calculateDuration, formatDate } from '../../utils/dateUtils';

const images = {
  img1: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&w=500&h=300&q=80', // Coastal town
  img2: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&w=500&h=300&q=80', // Florence Duomo
  img3: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?auto=format&w=500&h=300&q=80', // Venice canal
  img4: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&w=800&h=600&q=80', // Sunset cityscape
  img5: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?auto=format&w=500&h=300&q=80', // Colosseum
};

const reviews = [
  {
    id: 1,
    name: 'Мария О.',
    date: '1 неделя назад',
    rating: 5,
    text: 'Моя поездка в Алматы была наполнена яркими впечатлениями! Город не перестает удивлять своими красивыми улочками и современной архитектурой. Особо...',
    images: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f',
      'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba',
      'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd',
    ],
  },
  {
    id: 2,
    name: 'Алексей Н.',
    date: '2 недели назад',
    rating: 5,
    text: 'Отдых в Алматы оставил самые положительные впечатления! Город радует сочетанием современности и природы: шикарные виды на горы, красивые парки и м...',
  },
  {
    id: 3,
    name: 'Сергей П.',
    date: '',
    rating: 4,
    text: 'Прекрасный город для любителей активного отдыха! Мы посетили Чарынский каньон и Тургенские водопады – виды потрясающие, особенно во время рассвета. В Алма...',
  },
  {
    id: 4,
    name: 'София К.',
    date: '',
    rating: 5,
    text: 'Алматы – это удивительное место, где сочетаются природа и городская жизнь. Потрясающие виды гор, уютные кафе и богатая культура города не оставят ра...',
  },
];

type Tour = {
  id: number;
  title: string;
  description: string;
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
  itinerary: {
    location: string;
    duration: string;
    description: string;
  }[];
  averageRating: number;
  totalReviews: number;
  maxParticipants: number;
  hotelStar: number;
  location: string;
  duration: string;
};

const TourInfo: React.FC = () => {
  const [guestCount, setGuestCount] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);

  // Preload images to prevent reloading during scroll
  useEffect(() => {
    // Preload all gallery images
    Object.values(images).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchTour = async () => {
      try {
        setLoading(true);
        if (!id) {
          setError('ID тура не указан');
          return;
        }
        const data = await apiService.get(`/tours/${id}`);
        const tourData = Array.isArray(data) ? data : [data];
        setTours(tourData);
      } catch (err) {
        console.error('Ошибка при загрузке тура:', err);
        setError('Не удалось загрузить тур. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchTour();
  }, [id]); // Добавляем id в массив зависимостей

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
    <div className="container mx-auto px-4 py-8">
      {/* Gallery Section */}
      <div className="image-grid grid grid-cols-4 grid-rows-2 gap-5 h-[500px]">
        <div className="col-span-2 row-span-2 image-container">
          <img
            src={tours[0].imageUrls[0]}
            alt="Sunset cityscape"
            className="w-full h-full object-cover rounded-lg"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            width={800}
            height={600}
          />
        </div>
        <div className="col-span-1 row-span-1 image-container">
          <img
            src={tours[0].imageUrls[1]}
            alt="Coastal town"
            className="w-full h-full object-cover rounded-lg"
            loading="eager"
            decoding="async"
            width={500}
            height={300}
          />
        </div>
        <div className="col-span-1 row-span-1 image-container">
          <img
            src={tours[0].imageUrls[2]}
            alt="Florence Duomo"
            className="w-full h-full object-cover rounded-lg"
            loading="eager"
            decoding="async"
            width={500}
            height={300}
          />
        </div>
        <div className="col-span-1 row-span-1 image-container">
          <img
            src={tours[0].imageUrls[3]}
            alt="Venice canal"
            className="w-full h-full object-cover rounded-lg"
            loading="eager"
            decoding="async"
            width={500}
            height={300}
          />
        </div>
        <div className="col-span-1 row-span-1 image-container relative">
          <img
            src={tours[0].imageUrls[4]}
            alt="Colosseum"
            className="w-full h-full object-cover rounded-lg"
            loading="eager"
            decoding="async"
            width={500}
            height={300}
          />
          
        </div>
      </div>

      {/* Title and Description */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-4">
          {tours[0]?.title}
        </h1>
        <p className="text-gray-600 text-sm">
        {tours[0]?.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {/* Left Column - Tour Details */}
        <div className="md:col-span-2">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Длительность</h2>
            <div className="flex gap-2 my-1.5">
              {formatDate(tours[0].startDate)} - {formatDate(tours[0].endDate)}
            </div>
            <p className="text-sm mb-4">{calculateDuration(tours[0].startDate, tours[0].endDate)} {tours[0].title}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {tours[0]?.itinerary?.map((item: { location: string; duration: string; description: string }, index: number) => (
                <div key={index} className="rounded-lg border-2 border-gray-400">
                  <p className="px-3 py-1">{item.location}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 mt-2"></div>
          </div>

          {/* Plan Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">План путешествия</h2>

            <div className="accordion mb-4">
            {tours[0]?.itinerary?.map((item: { location: string; duration: string; description: string }, index: number) => (
              <div className="mb-4">
                <details className="bg-white border border-gray-200 rounded-md overflow-hidden">
                  <summary className="cursor-pointer p-4 flex items-center justify-between font-medium">
                  {item.location} ({item.duration})
                    <svg
                      width="12"
                      height="6"
                      viewBox="0 0 12 6"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L6 5L11 1"
                        stroke="#666"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </summary>
                  <div className="p-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                </details>
              </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Сервис</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tours[0]?.services?.map((serviceId, index) => {
                // Находим информацию о сервисе из serviceOptions по его id
                const serviceInfo = serviceOptions.find(option => option.id === serviceId);
                
                return (
                  <div key={index} className="bg-gray-100 p-4 rounded-md">
                    <div className="flex items-center mb-2">
                      <h3 className="font-medium text-sm">{serviceInfo?.title || serviceId}</h3>
                    </div>
                    <p className="text-xs text-gray-600">{serviceInfo?.description || 'Описание недоступно'}</p>
                  </div>
                );
              })}
              {(!tours[0]?.services || tours[0]?.services.length === 0) && (
                <div className="col-span-3 text-center py-4">Информация о сервисах не указана</div>
              )}
            </div>
          </div>
          {/* Reviews Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Отзывы</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.slice(0, 2).map((review) => (
                <div key={review.id} className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-3">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium mr-2">{review.name}</h3>
                        <div className="flex">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <svg
                                key={i}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill={i < review.rating ? '#FFD700' : 'none'}
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M8 1L10.1244 5.26864L14.5 6.01673L11.25 9.26527L12.0636 14L8 11.7686L3.93636 14L4.75 9.26527L1.5 6.01673L5.87563 5.26864L8 1Z"
                                  stroke="#FFD700"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-3">{review.text}</p>
                  {/* {review.images && (
                    <div className="flex gap-2 overflow-x-auto">
                      {review.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded"
                        ></div>
                      ))}
                    </div>
                  )} */}
                </div>
              ))}
            </div>
            {/* <div className="mt-4 text-center">
              <button className="text-sm text-gray-600 border border-gray-300 rounded-md px-4 py-2">
                Все отзывы
              </button>
            </div> */}
          </div>

          {/* Ratings Section */}
          {/* <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex flex-wrap justify-between gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">4.9</div>
                <div className="text-sm text-gray-500">Общий рейтинг</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5.0</div>
                <div className="text-sm text-gray-500">Проживание</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.4</div>
                <div className="text-sm text-gray-500">Экскурсовод</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5.0</div>
                <div className="text-sm text-gray-500">Питание</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.6</div>
                <div className="text-sm text-gray-500">Трансфер</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5.0</div>
                <div className="text-sm text-gray-500">Цены и качество</div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Right Column - Booking Panel */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <div className="mb-6 ">
              <h3 className="text-sm font-medium mb-3">Дата</h3>
                <div className="w-full border border-gray-200 rounded-md p-2  bg-white">
                  {formatDate(tours[0].startDate)} - {formatDate(tours[0].endDate)}
                </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3">Количество туров</h3>
              <div className="relative">
                <select
                  className="w-full border border-gray-200 rounded-md p-2 pr-8 bg-white"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                >
                  <option value="1">Тур на 1 человека</option>
                  <option value="2">Тур на 2 человека</option>
                  <option value="3">Тур на 3 человека</option>
                  <option value="4">Тур на 4 человека</option>
                  <option value="5">Тур на 5 человек</option>
                </select>
                <div className="absolute right-2 top-3 pointer-events-none">
                  <svg
                    width="12"
                    height="6"
                    viewBox="0 0 12 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Стоимость</h3>
              <div className="bg-white border border-gray-200 rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">+ {tours[0].price} ₸</span>
                  <span className="text-sm text-gray-600">x{guestCount}</span>
                </div>
                <div className="flex justify-between mb-2 text-gray-500 text-sm">
                  <span>НДС:</span>
                  <span>12% - {Math.round(tours[0].price * guestCount * 0.12).toLocaleString()} ₸</span>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="text-lg font-semibold">Итого:</span>
                  <span className="text-lg font-semibold text-orange-500">{Math.round(tours[0].price * guestCount).toLocaleString()} ₸</span>
                </div>
              </div>
            </div>

            <Link
              to={`/booking?guestCount=${guestCount}&price=${tours[0].price}&title=${encodeURIComponent(tours[0]?.title)}`}
              className="bg-orange-400 text-white hover:bg-orange-700 font-medium rounded-lg px-4 py-2 w-full flex items-center justify-center"
            >
              Забронировать
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourInfo;
