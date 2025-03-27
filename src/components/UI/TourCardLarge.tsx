import { Heart } from 'lucide-react';
import React, { useState } from 'react';
import FamilyIcon from '../../assets/icons/FamilyIcon.svg';
import AdultIcon from '../../assets/icons/AdultIcon.svg';
import HotelIcon from '../../assets/icons/HotelIcon.svg';
import TransferIcon from '../../assets/icons/TransferIcon.svg';
import MealIcon from '../../assets/icons/MealIcon.svg';
import RemainingIcon from '../../assets/icons/RemainingIcon.svg';
import StarIcon from '../../assets/icons/StarIcon.svg';
import HotelStarIcon from '../../assets/icons/HotelStarIcon.svg';
import LocationIcon from '../../assets/icons/LocationIcon.svg';
import DurationIcon from '../../assets/icons/DurationIcon.svg';

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

interface TourCardLargeProps {
  tour: Tour;
}

export const TourCardLarge: React.FC<TourCardLargeProps> = ({ tour }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div key={tour.id} className="border-2 border-gray-300 rounded-lg overflow-hidden mb-4">
      <div className="flex border-b border-gray-300">
        <div className="relative w-48 h-48 px-3 pt-3">
          <img
            src={tour.image}
            alt={tour.title}
            className="h-full w-full object-cover rounded-lg"
          />
          <button
            className="absolute top-4 right-4 bg-blue-50 p-1 rounded-full"
            onClick={toggleFavorite}
          >
            <Heart
              size={20}
              className={`${isFavorite ? 'text-blue-500 fill-blue-500' : 'text-blue-500'}`}
            />
          </button>
        </div>

        {/* Информация справа */}
        <div className="flex-1 py-3 pl-1 pr-3">
          <div className="flex justify-between">
            <div>
              <h3 className="text-2xl font-medium ">{tour.title}</h3>
              <div
                className={`inline-block ${tour.isFamilyFriendly ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'} text-sm py-1 px-3 rounded-full mt-4 mb-3`}
              >
                {tour.isFamilyFriendly ? (
                  <span className="flex items-center gap-2">
                    <img src={FamilyIcon} alt="Family friendly" />
                    Для всей семьи
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <img src={AdultIcon} alt="For adults" />
                    Для взрослых
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="">
            <p className="text-sm text-gray-500">Даты проведения</p>
            <div className="flex gap-2 my-1.5">
              {tour.departureDates.slice(0, 2).map((date, dateIndex) => (
                <span key={dateIndex} className="text-sm">
                  {date}
                </span>
              ))}
              {tour.departureDates.length > 2 && (
                <span className="text-sm text-blue-500">
                  +{tour.departureDates.length - 2} more
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {tour.features.includes('hotel') && (
              <div className="bg-blue-50 text-blue-900 text-xs px-3 py-1.5 rounded-full flex items-center ">
                <span className="mr-1 flex gap-2 items-center">
                  <img src={HotelIcon} alt="Hotel" />
                  Отель
                </span>
              </div>
            )}
            {tour.features.includes('transfer') && (
              <div className="bg-blue-50 text-blue-900 text-xs px-3 py-1.5 rounded-full flex items-center">
                <span className="mr-1 flex gap-2 items-center">
                  <img src={TransferIcon} alt="Transfer" />
                  Трансфер
                </span>
              </div>
            )}
            {tour.features.includes('meal') && (
              <div className="bg-blue-50 text-blue-900 text-xs px-3 py-1.5 rounded-full flex items-center">
                <span className="mr-1 flex gap-2 items-center">
                  <img src={MealIcon} alt="Meal" />
                  Питание
                </span>
              </div>
            )}
            {tour.remaining && (
              <div className="ml-auto">
                <button className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2">
                  <img src={RemainingIcon} alt="Remaining" />
                   {tour.remaining} осталось мест
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center p-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="p-1.5 bg-gray-100 mr-2 rounded-lg">
              <img src={StarIcon} alt="Rating" />
            </span>
            <span>
              {tour.rating} ({tour.reviewCount} отзывов)
            </span>
          </div>
          <div className="flex items-center">
            <span className="p-1.5 bg-gray-100 mr-2 rounded-lg">
              <img src={HotelStarIcon} alt="Hotel star" />
            </span>
            <span>{tour.hotelStar} звездочный отель</span>
          </div>
          <div className="flex items-center">
            <span className="p-1.5 bg-gray-100 mr-2 rounded-lg">
              <img src={LocationIcon} alt="Location" />
            </span>
            <span>{tour.location}</span>
          </div>
          <div className="flex items-center">
            <span className="p-1.5 bg-gray-100 mr-2 rounded-lg">
              <img src={DurationIcon} alt="Duration" />
            </span>
            <span>{tour.duration}</span>
          </div>
        </div>
        <div className="text-right text-blue-500 font-bold">
          От {tour.price.toLocaleString()} Тг
        </div>
      </div>
    </div>
  );
};
