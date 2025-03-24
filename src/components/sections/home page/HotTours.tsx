import { useState, useEffect } from 'react';
import TourCard from '../../UI/TourCard';

const HotTours = ({ tours }) => {
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Популярные предложения</h1>
        <a href="#" className="text-xl font-medium text-gray-500">
          Посмотреть все
        </a>
      </div>
      
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {tours.map((tour, index) => (
            <TourCard key={index} tour={tour} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotTours;
