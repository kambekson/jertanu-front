import { useState, useEffect } from 'react';
import TourCard from '../../UI/TourCard';
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

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 >= tours.length - 2 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, currentIndex]);

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Горячие предложения</h1>
        <Link to="/tours">
          <span className="text-xl font-medium text-gray-500">Посмотреть все</span>
        </Link>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {tours.map((tour: Tour, index: number) => (
            <Link key={index} to={`/tour/${tour.id}`}>
              <TourCard tour={tour} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotTours;
