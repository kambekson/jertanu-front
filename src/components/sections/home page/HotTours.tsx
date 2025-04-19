import { useState, useEffect } from 'react';
import TourCard from '../../../UI/TourCard';
import { Link } from 'react-router-dom';

export interface Tour {
  id: number;
  img: string;
  city: string;
  title: string;
  rating: number;
  totalReviews: number;
  dates: string;
  price: number;
  isNew?: boolean;
  discount?: number;
  oldPrice?: number;
  textColor?: string;
}

const HotTours = ({ tours }: { tours: Tour[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  // Calculate how many slides we can have (tours.length - visible cards + 1)
  const maxIndex = Math.max(0, tours.length - 3);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= maxIndex ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex <= 0 ? maxIndex : prevIndex - 1));
  };

  // Set up auto play
  useEffect(() => {
    if (!autoPlay || tours.length <= 3) return;

    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [autoPlay, currentIndex]);

  // If we have 3 or fewer tours, just display them without sliding
  if (tours.length <= 3) {
    return (
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-2xl">Горячие предложения</h1>
          <Link to="/tours">
            <span className="text-xl font-medium text-gray-500">Посмотреть все</span>
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {tours.map((tour) => (
            <Link key={tour.id} to={`/tour/${tour.id}`}>
              <TourCard tour={tour} />
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Горячие предложения</h1>
        <Link to="/tours">
          <span className="text-xl font-medium text-gray-500">Посмотреть все</span>
        </Link>
      </div>

      <div className="relative">
        {/* Carousel container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {tours.map((tour) => (
              <div key={tour.id} className="flex-none w-1/3 px-2">
                <Link to={`/tour/${tour.id}`}>
                  <TourCard tour={tour} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotTours;
