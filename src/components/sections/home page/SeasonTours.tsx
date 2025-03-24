import { useState } from 'react';
import { useEffect } from 'react';
import seasonTours from '../../../assets/season.jpg';
import TourCard from '../../UI/TourCard';

const SeasonTours = ({tours}) => {
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
    <div className="relative">
      <img
        src={seasonTours}
        alt="season-tours"
        className="w-screen absolute left-0 right-0 object-cover brightness-50 h-[564px]"
      />
      <div className="">
        <div className="relative overflow-hidden w-full h-2/3">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {tours.map((tour, index) => (
              <TourCard key={index} tour={{...tour, textColor: 'text-white'}} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonTours;
