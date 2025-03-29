import { useState } from 'react';
import { Link } from 'react-router-dom';


const images = {
  img1: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', // Coastal town
  img2: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f', // Florence Duomo
  img3: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a', // Venice canal
  img4: 'https://images.unsplash.com/photo-1519681393784-d120267933ba', // Sunset cityscape
  img5: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd', // Colosseum
};

const itineraryData = [
  {
    day: 1,
    title: 'Алматы',
    activities: [
      'Парк 28 панфиловцев',
      'Музей',
      'Кок-Тобе',
      'Горный парк (Алматинский ботанический сад)'
    ]
  },
  {
    day: 2,
    title: 'Алматы – Большое Алматинское озеро',
    activities: [
      'Большое Алматинское озеро – это одно из самых красивых природных мест в Алматинской области, окруженное величественными горами',
      'Пикник или отдых в зоне, оборудованной для туристов'
    ]
  },
  {
    day: 3,
    title: 'Алматы – Чарынский каньон',
    activities: [
      'Прогулка по Чарынскому каньону. Самая известная часть каньона – "Долина замков, где высечены удивительные скалы, напоминающие замки, башни и другие архитектурные формы'
    ]
  },
  {
    day: 4,
    title: 'Алматы – Тургень',
    activities: [
      'Прогулка по Тургеньскому ущелью и посещение Тургенских водопадов',
      'Можно взять легкий поход, наслаждаться природой и делать фотографии'
    ]
  },
  {
    day: 5,
    title: 'Алматы – Национальный парк "Алтын Эмель"',
    activities: [
      'Посещение Барханa Көльөй (песчаная дюна высотой до 150 метров)',
      'Исследование исторических и археологических памятников, таких как петроглифы'
    ]
  },
  {
    day: 6,
    title: 'Алматы – Капчагайское водохранилище',
    activities: [
      'Отдых на пляжах Капчагайского водохранилища',
      'Для активных туристов – возможность заняться водными видами спорта, такими как каякинг, катание на водных мотоциклах, рыбалка'
    ]
  }
];


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
      'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd'
    ]
  },
  {
    id: 2,
    name: 'Алексей Н.',
    date: '2 недели назад',
    rating: 5,
    text: 'Отдых в Алматы оставил самые положительные впечатления! Город радует сочетанием современности и природы: шикарные виды на горы, красивые парки и м...'
  },
  {
    id: 3,
    name: 'Сергей П.',
    date: '',
    rating: 4,
    text: 'Прекрасный город для любителей активного отдыха! Мы посетили Чарынский каньон и Тургенские водопады – виды потрясающие, особенно во время рассвета. В Алма...'
  },
  {
    id: 4,
    name: 'София К.',
    date: '',
    rating: 5,
    text: 'Алматы – это удивительное место, где сочетаются природа и городская жизнь. Потрясающие виды гор, уютные кафе и богатая культура города не оставят ра...'
  }
];


const services = [
  {
    title: 'Экскурсовод',
    description: 'Экскурсовод для каждого направления или объекта включен'
  },
  {
    title: 'Питание',
    description: 'Завтрак и обед включены'
  },
  {
    title: 'Услуги в номере',
    description: 'Уборка в номере, прачечная, услуги в номере и т.д.'
  },
  {
    title: 'Трансфер',
    description: 'Все необходимые транспортные средства предоставлены'
  },
  {
    title: 'Билеты',
    description: 'Все необходимые билеты включены'
  }
];

// Расчет цены
const priceCalculation = {
  basePrice: 43560.00,
  additionalFee: 62280.00,
  subtotal: 111430.90,
  tax: 27710.00,
  total: 351360.00
};

// Места для посещения
const places = ['Алматы', 'Большое Алматинское озеро', 'Чарынский каньон', 'Тургень', 'Национальный парк', 'Капчагайское водохранилище'];


const TourInfo = () => {
  const [selectedDate, setSelectedDate] = useState('03 Июль 2023');
  const [guestCount, setGuestCount] = useState('4 взрослых, 1 ребенок');
  const [roomCount, setRoomCount] = useState('1 стандарт, 2 одноместные');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Gallery Section */}
      <div className="image-grid grid grid-cols-4 grid-rows-2 gap-5 h-[500px]">
        <div className="col-span-2 row-span-2 image-container">
          <img
            src={images.img4}
            alt="Sunset cityscape"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-1 image-container">
          <img
            src={images.img1}
            alt="Coastal town"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-1 image-container">
          <img
            src={images.img2}
            alt="Florence Duomo"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-1 image-container">
          <img
            src={images.img3}
            alt="Venice canal"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-1 image-container relative">
          <img
            src={images.img5}
            alt="Colosseum"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="overlay absolute inset-0 flex items-end justify-end p-4">
            <Link to="/tour" className="text-white font-bold text-sm">
              (28+) Подробнее
            </Link>
          </div>
        </div>
      </div>

      {/* Title and Description */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-4">
          Алматинская область: Путешествие через искусство, историю и культуру
        </h1>
        <p className="text-gray-600 text-sm">
          Путешествие по Алматинской области – это уникальная возможность насладиться сочетанием живописных гор, древних 
          памятников и богатой природы. Здесь можно посетить такие природные чудеса, как Чарынский каньон, Большое Алматинское 
          озеро и Медео, а также погрузиться в атмосферу исторических и культурных достопримечательностей.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
        {/* Left Column - Tour Details */}
        <div className="md:col-span-2">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Длительность</h2>
            <p className="text-sm mb-4">10 дней захватывающего путешествия по югу Казахстана</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {places.map((place, index) => (
                <div key={index} className="rounded-lg border-2 border-gray-400">
                  <p className="px-3 py-1">{place}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 pt-4 mt-2"></div>
          </div>

          {/* Plan Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">План путешествия</h2>
            
            <div className="accordion mb-4">
              <div className="mb-4">
                <details className="bg-white border border-gray-200 rounded-md overflow-hidden">
                  <summary className="cursor-pointer p-4 flex items-center justify-between font-medium">
                    Алматы (7 ночей)
                    <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 5L11 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 border-t border-gray-100">
                    <p className="text-sm text-gray-600">Детальная программа пребывания в Алматы</p>
                  </div>
                </details>
              </div>
              
              <div className="mb-4">
                <details className="bg-white border border-gray-200 rounded-md overflow-hidden">
                  <summary className="cursor-pointer p-4 flex items-center justify-between font-medium">
                    Большое Алматинское озеро (1 день)
                    <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 5L11 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 border-t border-gray-100">
                    <p className="text-sm text-gray-600">Посещение живописного озера, окруженного горными пиками</p>
                  </div>
                </details>
              </div>
              
              <div className="mb-4">
                <details className="bg-white border border-gray-200 rounded-md overflow-hidden">
                  <summary className="cursor-pointer p-4 flex items-center justify-between font-medium">
                    Чарынский каньон (1 день)
                    <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 5L11 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 border-t border-gray-100">
                    <p className="text-sm text-gray-600">Прогулка по одному из самых впечатляющих каньонов региона</p>
                  </div>
                </details>
              </div>
              
              <div className="mb-4">
                <details className="bg-white border border-gray-200 rounded-md overflow-hidden">
                  <summary className="cursor-pointer p-4 flex items-center justify-between font-medium">
                    Тургень (1 день)
                    <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 5L11 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 border-t border-gray-100">
                    <p className="text-sm text-gray-600">Посещение живописных водопадов и ущелья</p>
                  </div>
                </details>
              </div>
              
              <div className="mb-4">
                <details className="bg-white border border-gray-200 rounded-md overflow-hidden">
                  <summary className="cursor-pointer p-4 flex items-center justify-between font-medium">
                    Национальный парк "Алтын Эмель" (1 день)
                    <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 5L11 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 border-t border-gray-100">
                    <p className="text-sm text-gray-600">Исследование природных и исторических достопримечательностей парка</p>
                  </div>
                </details>
              </div>
              
              <div className="mb-4">
                <details className="bg-white border border-gray-200 rounded-md overflow-hidden">
                  <summary className="cursor-pointer p-4 flex items-center justify-between font-medium">
                    Капчагайское водохранилище (1 день)
                    <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L6 5L11 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </summary>
                  <div className="p-4 pt-0 border-t border-gray-100">
                    <p className="text-sm text-gray-600">Отдых на берегу и водные активности</p>
                  </div>
                </details>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Сервис</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {services.map((service, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 mr-2 bg-gray-200 rounded-full flex items-center justify-center">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="#666" strokeWidth="1.5" strokeMiterlimit="10"/>
                        <path d="M8 5.5V8.5H11" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h3 className="font-medium text-sm">{service.title}</h3>
                  </div>
                  <p className="text-xs text-gray-600 ml-8">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Schedule Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Расписание</h2>
            <div className="relative">
              {itineraryData.map((day, index) => (
                <div key={index} className="flex mb-6 relative">
                  <div className="mr-6 flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center z-10">
                      {day.day}
                    </div>
                    {index < itineraryData.length - 1 && (
                      <div className="w-0.5 h-full bg-gray-200 absolute top-8 left-4"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-2">День {day.day}: {day.title}</h3>
                    <ul className="list-disc pl-6 text-sm text-gray-600 space-y-2">
                      {day.activities.map((activity, idx) => (
                        <li key={idx}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Отзывы</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.slice(0, 2).map((review) => (
                <div key={review.id} className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium mr-2">{review.name}</h3>
                        <div className="flex">
                          {Array(5).fill(0).map((_, i) => (
                            <svg key={i} width="16" height="16" viewBox="0 0 16 16" fill={i < review.rating ? "#FFD700" : "none"} xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 1L10.1244 5.26864L14.5 6.01673L11.25 9.26527L12.0636 14L8 11.7686L3.93636 14L4.75 9.26527L1.5 6.01673L5.87563 5.26864L8 1Z" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
                  </div>
                  <p className="text-sm mb-3">{review.text}</p>
                  {review.images && (
                    <div className="flex gap-2 overflow-x-auto">
                      {review.images.map((img, idx) => (
                        <div key={idx} className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-sm text-gray-600 border border-gray-300 rounded-md px-4 py-2">
                Все отзывы
              </button>
            </div>
          </div>

          {/* Ratings Section */}
          <div className="bg-gray-50 rounded-lg p-6">
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
          </div>
        </div>

        {/* Right Column - Booking Panel */}
        <div className="md:col-span-1">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Дата</h3>
              <div className="relative">
                <select 
                  className="w-full border border-gray-200 rounded-md p-2 pr-8 bg-white"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option>03 Июль 2023</option>
                </select>
                <div className="absolute right-2 top-3 pointer-events-none">
                  <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 5L11 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Гости</h3>
              <div className="relative">
                <select 
                  className="w-full border border-gray-200 rounded-md p-2 pr-8 bg-white"
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                >
                  <option>4 взрослых, 1 ребенок</option>
                </select>
                <div className="absolute right-2 top-3 pointer-events-none">
                  <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 5L11 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Номер</h3>
              <div className="relative">
                <select 
                  className="w-full border border-gray-200 rounded-md p-2 pr-8 bg-white"
                  value={roomCount}
                  onChange={(e) => setRoomCount(e.target.value)}
                >
                  <option>1 стандарт, 2 одноместные</option>
                </select>
                <div className="absolute right-2 top-3 pointer-events-none">
                  <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 5L11 1" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Стоимость</h3>
              <div className="bg-white border border-gray-200 rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">+ 43,560.00 ₸</span>
                  <span className="text-sm text-gray-600">+ 62,280.00 ₸</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Итого:</span>
                  <span className="text-sm font-medium">111,430.90 ₸</span>
                </div>
                <div className="flex justify-between mb-2 text-gray-500 text-sm">
                  <span>НДС:</span>
                  <span>12% - 27,710.00 ₸</span>
                </div>
                <div className="flex justify-between mt-4 pt-4 border-t border-gray-200">
                  <span className="text-lg font-semibold">Итого:</span>
                  <span className="text-lg font-semibold text-orange-500">351,360.00 ₸</span>
                </div>
              </div>
            </div>

            <button className="bg-orange-500 hover:bg-orange-600 text-white w-full rounded-md py-3 font-medium transition-colors">
              Забронировать
            </button>
          </div>
        </div>
      </div>


    </div>
  );
};

export default TourInfo;


