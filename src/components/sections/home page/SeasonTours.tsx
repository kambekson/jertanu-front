import { useState, useEffect } from 'react';
import seasonTours from '../../../assets/season.jpg';
import TourCard from '../../UI/TourCard';

interface BaseTour {
  img: string;
  city: string;
  isNew?: boolean;
  discount?: string | number;
  title: string;
  rating: number;
  dates: string;
  oldPrice?: number;
  price: number;
  textColor?: string;
}

interface ExtendedTour extends BaseTour {
  badges?: string[];
  [key: string]: any;
}

interface SeasonToursProps {
  tours: BaseTour[];
}

const SeasonTours = ({ tours }: SeasonToursProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1 >= tours.length - 2 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? tours.length - 3 : prevIndex - 1));
  };

  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [autoPlay, currentIndex]);

  return (
    <div className="relative py-12 w-full overflow-hidden">
      <img
        src={seasonTours}
        alt="season-tours"
        className="absolute left-0 right-0 top-0 object-cover brightness-50 h-[564px] w-screen"
      />

      <div className="container relative">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Сезонное предложение</h2>
          <button className="text-white underline">Загрузить больше</button>
        </div>

        <div className="relative overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {tours.map((tour: BaseTour, index: number) => (
              <TourCard
                key={index}
                tour={
                  {
                    ...tour,
                    textColor: 'text-white',
                    badges: [
                      'Ограниченное по времени предложение',
                      `Скидка ${tour.discount || '30%'}`,
                    ],
                  } as any
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonTours;
