import toursHero from "../assets/toursHero.jpg"
import TourSearchBar from "../components/UI/TourSearchBar"
import { useState } from "react"
import { Heart } from "lucide-react"

// Типы данных для туров
type Tour = {
    id: number;
    title: string;
    image: string;
    price: number;
    tags: string[];
    departureDates: string[];
    features: string[];
    rating: number;
    reviewCount: number;
    hotelStar: number;
    location: string;
    duration: string;
    remaining?: number;
}

// Демо-данные для туров
const tours: Tour[] = [
    {
        id: 1,
        title: "Italy in 21 days",
        image: "https://picsum.photos/400/300?random=1",
        price: 7500,
        tags: ["Family Friendly"],
        departureDates: ["Jan 5, 2025", "April 24, 2025", "May 12, 2025", "June 7, 2025", "July 20, 2025"],
        features: ["hotel", "flight", "transfer", "meal"],
        rating: 4.6,
        reviewCount: 45,
        hotelStar: 5,
        location: "Artemide",
        duration: "20 Nights and 21 Days",
        remaining: 6
    },
    {
        id: 2,
        title: "Santorini",
        image: "https://picsum.photos/400/300?random=2",
        price: 1250,
        tags: ["Adult Only"],
        departureDates: ["Jan 5, 2025", "Aug 24, 2025", "Sep 15, 2025"],
        features: ["hotel", "flight", "transfer", "meal"],
        rating: 4.8,
        reviewCount: 380,
        hotelStar: 5,
        location: "Sheraton",
        duration: "5 Nights and 4 Days"
    },
    {
        id: 3,
        title: "Spain",
        image: "https://picsum.photos/400/300?random=3",
        price: 7500,
        tags: [],
        departureDates: ["Jan 5, 2025", "Aug 24, 2025", "Sep 10, 2025"],
        features: ["hotel", "flight", "transfer", "meal"],
        rating: 4.6,
        reviewCount: 45,
        hotelStar: 4,
        location: "Aqua Luxury suits",
        duration: "6 Nights and 7 Days",
        remaining: 15
    },
    {
        id: 4,
        title: "Prague",
        image: "https://picsum.photos/400/300?random=4",
        price: 7500,
        tags: ["Adult Only"],
        departureDates: ["Jan 5, 2025", "Aug 24, 2025", "Sep 20, 2025"],
        features: ["hotel", "flight", "transfer", "meal"],
        rating: 4.6,
        reviewCount: 45,
        hotelStar: 4,
        location: "Aqua Luxury suits",
        duration: "6 Nights and 7 Days",
        remaining: 2
    },
    {
        id: 5,
        title: "London",
        image: "https://picsum.photos/400/300?random=5",
        price: 7500,
        tags: [],
        departureDates: ["Jan 5, 2025", "Aug 24, 2025", "Oct 15, 2025"],
        features: ["hotel", "flight", "transfer"],
        rating: 4.6,
        reviewCount: 45,
        hotelStar: 4,
        location: "Aqua Luxury suits",
        duration: "6 Nights and 7 Days"
    },
    {
        id: 6,
        title: "Austria",
        image: "https://picsum.photos/400/300?random=6",
        price: 7500,
        tags: ["Family Friendly"],
        departureDates: ["Jan 5, 2025", "Aug 24, 2025", "Nov 10, 2025"],
        features: ["hotel", "flight", "meal"],
        rating: 4.6,
        reviewCount: 45,
        hotelStar: 4,
        location: "Aqua Luxury suits",
        duration: "6 Nights and 7 Days"
    }
];

export default function ToursPage(){
    // Состояния для фильтров
    const [compareToursEnabled, setCompareToursEnabled] = useState(false)
    const [priceRange, setPriceRange] = useState([0, 10000])
    const [daysRange, setDaysRange] = useState([3, 21])
    const [rating, setRating] = useState(0)
    const [accommodationType, setAccommodationType] = useState("any")
    
    return(
        <div>
            <div className="relative">
                <img src={toursHero} className="h-[204px] w-full object-cover"></img>
                <div className="absolute flex flex-row inset-1 items-center justify-center">
                    <TourSearchBar/>
                </div>
            </div>
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-row gap-6">
                    {/* Левая колонка с фильтрами */}
                    <div className="w-64 flex flex-col gap-4">
                        {/* Сравнить туры */}
                        <div className="border rounded-lg p-4">
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
                        <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Фильтровать по</span>
                                <button className="text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                </button>
                            </div>
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center">
                                    <input type="checkbox" id="filter1" className="mr-2" />
                                    <label htmlFor="filter1" className="text-sm">Откройте для себя туры по типу</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="filter2" className="mr-2" />
                                    <label htmlFor="filter2" className="text-sm">на открытом воздухе</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="filter3" className="mr-2" />
                                    <label htmlFor="filter3" className="text-sm">городская жизнь</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="filter4" className="mr-2" />
                                    <label htmlFor="filter4" className="text-sm">Культурное и наследие</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="filter5" className="mr-2" />
                                    <label htmlFor="filter5" className="text-sm">Для всей семьи</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="filter6" className="mr-2" />
                                    <label htmlFor="filter6" className="text-sm">Роскошь и Эксклюзивность</label>
                                </div>
                            </div>
                        </div>

                        {/* Цена */}
                        <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Цена</span>
                                <button className="text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
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
                                    <input 
                                        type="range" 
                                        min="0" 
                                        max="10000" 
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Кол-во дней */}
                        <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Кол-во дней</span>
                                <button className="text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                </button>
                            </div>
                            <div className="mt-2">
                                <div className="flex justify-between text-sm">
                                    <span>мин: 3 дня</span>
                                    <span>21+ дней</span>
                                </div>
                                <div className="mt-4">
                                    <input 
                                        type="range" 
                                        min="3" 
                                        max="21" 
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Выбор рейтинга */}
                        <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Выбор рейтинга</span>
                                <button className="text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
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
                        <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Вариант проживания</span>
                                <button className="text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                </button>
                            </div>
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center">
                                    <input type="radio" id="any" name="accommodation" className="mr-2" checked={accommodationType === 'any'} onChange={() => setAccommodationType('any')} />
                                    <label htmlFor="any" className="text-sm">Любой</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" id="hotels" name="accommodation" className="mr-2" checked={accommodationType === 'hotels'} onChange={() => setAccommodationType('hotels')} />
                                    <label htmlFor="hotels" className="text-sm">Отели</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" id="lodges" name="accommodation" className="mr-2" checked={accommodationType === 'lodges'} onChange={() => setAccommodationType('lodges')} />
                                    <label htmlFor="lodges" className="text-sm">Лоджи</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" id="resorts" name="accommodation" className="mr-2" checked={accommodationType === 'resorts'} onChange={() => setAccommodationType('resorts')} />
                                    <label htmlFor="resorts" className="text-sm">Курорты</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="radio" id="inns" name="accommodation" className="mr-2" checked={accommodationType === 'inns'} onChange={() => setAccommodationType('inns')} />
                                    <label htmlFor="inns" className="text-sm">Гостиницы</label>
                                </div>
                            </div>
                        </div>

                        {/* Accessibility */}
                        <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Accessibility</span>
                                <button className="text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                </button>
                            </div>
                            <div className="mt-2 space-y-2">
                                <div className="flex items-center">
                                    <input type="checkbox" id="wheelchair" className="mr-2" />
                                    <label htmlFor="wheelchair" className="text-sm">Wheelchair Accessible</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="serviceAnimal" className="mr-2" />
                                    <label htmlFor="serviceAnimal" className="text-sm">Service Animal Friendly</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="listening" className="mr-2" />
                                    <label htmlFor="listening" className="text-sm">Assistive Listening Devices</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="restrooms" className="mr-2" />
                                    <label htmlFor="restrooms" className="text-sm">Accessible Restrooms</label>
                                </div>
                                <div className="flex items-center">
                                    <input type="checkbox" id="audioGuides" className="mr-2" />
                                    <label htmlFor="audioGuides" className="text-sm">Audio Guides for the Visually Impaired</label>
                                </div>
                            </div>
                        </div>

                        {/* Guests */}
                        <div className="border rounded-lg p-4">
                            <div className="flex justify-between items-center">
                                <span className="font-medium">Guests</span>
                                <button className="text-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                </button>
                            </div>
                            <div className="mt-2 space-y-4">
                                <div>
                                    <p className="text-sm mb-1">Adults</p>
                                    <p className="text-xs text-gray-500">Age 13+</p>
                                    <div className="flex items-center mt-1">
                                        <button className="border rounded-md w-8 h-8 flex items-center justify-center">-</button>
                                        <span className="mx-4">4</span>
                                        <button className="border rounded-md w-8 h-8 flex items-center justify-center">+</button>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm mb-1">Children</p>
                                    <p className="text-xs text-gray-500">Age 0-13</p>
                                    <div className="flex items-center mt-1">
                                        <button className="border rounded-md w-8 h-8 flex items-center justify-center">-</button>
                                        <span className="mx-4">1</span>
                                        <button className="border rounded-md w-8 h-8 flex items-center justify-center">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Правая колонка с турами */}
                    <div className="flex-1">
                        {/* Заголовок с количеством и фильтром */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-medium">{tours.length} tours in Europe</h2>
                            <div className="flex items-center">
                                <span className="mr-2 text-sm">Sort By</span>
                                <select className="border rounded-md p-2 text-sm">
                                    <option>Recommended</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Duration: Short to Long</option>
                                    <option>Rating</option>
                                </select>
                            </div>
                        </div>

                        {/* Карточки туров через map */}
                        {tours.map((tour, index) => (
                            <div key={index} className="border rounded-lg overflow-hidden mb-4">
                                <div className="flex">
                                    {/* Изображение слева */}
                                    <div className="relative w-72">
                                        <img src={tour.image} alt={tour.title} className="h-full w-full object-cover" />
                                        <button className="absolute top-2 right-2 bg-white p-1 rounded-full">
                                            <Heart size={20} className="text-blue-500" />
                                        </button>
                                    </div>

                                    {/* Информация справа */}
                                    <div className="flex-1 p-4">
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold">{tour.title}</h3>
                                                {tour.tags.map((tag, tagIndex) => (
                                                    <div key={tagIndex} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1 mr-2">
                                                        {tag}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="text-right text-blue-500 font-bold">
                                                From €{tour.price.toLocaleString()}
                                            </div>
                                        </div>

                                        <div className="mt-4">
                                            <p className="text-sm text-gray-500">Available Departure Dates</p>
                                            <div className="flex gap-2 mt-1">
                                                {tour.departureDates.slice(0, 2).map((date, dateIndex) => (
                                                    <span key={dateIndex} className="text-sm">{date}</span>
                                                ))}
                                                {tour.departureDates.length > 2 && (
                                                    <span className="text-sm text-blue-500">+{tour.departureDates.length - 2} more</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex gap-2 mt-4">
                                            {tour.features.includes('hotel') && (
                                                <div className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full flex items-center">
                                                    <span className="mr-1">🏨</span> Hotel
                                                </div>
                                            )}
                                            {tour.features.includes('flight') && (
                                                <div className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full flex items-center">
                                                    <span className="mr-1">✈️</span> Flight
                                                </div>
                                            )}
                                            {tour.features.includes('transfer') && (
                                                <div className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full flex items-center">
                                                    <span className="mr-1">🚌</span> Transfer
                                                </div>
                                            )}
                                            {tour.features.includes('meal') && (
                                                <div className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full flex items-center">
                                                    <span className="mr-1">🍽️</span> Meal
                                                </div>
                                            )}
                                            {tour.remaining && (
                                                <div className="ml-auto">
                                                    <button className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                                        Only {tour.remaining} left
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-4 mt-6">
                                            <div className="flex items-center">
                                                <span className="text-yellow-400 mr-1">★</span>
                                                <span>{tour.rating} ({tour.reviewCount} Reviews)</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="mr-1">🏨</span>
                                                <span>{tour.hotelStar} Star Hotel</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="mr-1">📍</span>
                                                <span>{tour.location}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="mr-1">🕒</span>
                                                <span>{tour.duration}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}