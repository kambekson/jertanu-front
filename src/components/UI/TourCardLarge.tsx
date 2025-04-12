import { Heart } from 'lucide-react';
import React, { useState } from 'react';
import HotelIcon from '../../assets/icons/HotelIcon.svg';
import TransferIcon from '../../assets/icons/TransferIcon.svg';
import MealIcon from '../../assets/icons/MealIcon.svg';
import RemainingIcon from '../../assets/icons/RemainingIcon.svg';
import StarIcon from '../../assets/icons/StarIcon.svg';
import LocationIcon from '../../assets/icons/LocationIcon.svg';
import DurationIcon from '../../assets/icons/DurationIcon.svg';
import GuideIcon from '../../assets/icons/GuideIcon.svg';
import TicketsIcon from '../../assets/icons/TicketsIcon.svg';
import {Tour} from '../../pages/ToursPage'
import { calculateDuration, formatDate } from '../../utils/dateUtils';

interface TourCardLargeProps {
  tour: Tour;
}

export const TourCardLarge: React.FC<TourCardLargeProps> = ({ tour }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="border-2 border-gray-300 rounded-lg overflow-hidden mb-4">
      <div className="flex border-b border-gray-300">
        <div className="relative w-48 h-48 px-3 pt-3">
          <img
            src={tour.imageUrls[0]}
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

        <div className="flex-1 py-3 pl-1 pr-3">
          <div className="flex justify-between">
            <div>
              <h3 className="text-2xl font-medium">{tour.title}</h3>
              <div
                className={`inline-block ${
                  tour.status === 'hot'
                    ? 'bg-orange-100 text-orange-700'
                    : tour.status === 'seasonal'
                    ? 'bg-green-100 text-green-700'
                    : tour.status === 'new_destination'
                    ? 'bg-blue-100 text-blue-700'
                    : tour.status === 'regular'
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-orange-50 text-orange-600'
                } text-sm py-1 px-3 rounded-full mt-4 mb-3`}
              >
                {tour.status === 'hot' ? (
                  <span className="flex items-center gap-2">
                    Горящий тур
                  </span>
                ) : tour.status === 'seasonal' ? (
                  <span className="flex items-center gap-2">
                    Сезонный тур
                  </span>
                ) : tour.status === 'new_destination' ? (
                  <span className="flex items-center gap-2">
                    Новое направление
                  </span>
                ) : tour.status === 'regular' ? (
                  <span className="flex items-center gap-2">
                    Регулярный тур
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                  </span>
                )}
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500">Даты проведения</p>
            <div className="flex gap-2 my-1.5">
              {formatDate(tour.startDate)} - {formatDate(tour.endDate)}
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {tour.services?.includes('hotel') && (
              <div className="bg-blue-50 text-blue-900 text-xs px-3 py-1.5 rounded-full flex items-center">
                <span className="mr-1 flex gap-2 items-center">
                  <img src={HotelIcon} alt="Hotel" />
                  Отель
                </span>
              </div>
            )}
            {tour.services?.includes('transfer') && (
              <div className="bg-blue-50 text-blue-900 text-xs px-3 py-1.5 rounded-full flex items-center">
                <span className="mr-1 flex gap-2 items-center">
                  <img src={TransferIcon} alt="Transfer" />
                  Трансфер
                </span>
              </div>
            )}
            {tour.services?.includes('food') && (
              <div className="bg-blue-50 text-blue-900 text-xs px-3 py-1.5 rounded-full flex items-center">
                <span className="mr-1 flex gap-2 items-center">
                  <img src={MealIcon} alt="Meal" />
                  Питание
                </span>
              </div>
            )}
            {tour.services?.includes('guide') && (
              <div className="bg-blue-50 text-blue-900 text-xs px-3 py-1.5 rounded-full flex items-center">
                <span className="mr-1 flex gap-2 items-center">
                  <img src={GuideIcon} alt="Guide" />
                  Экскурсовод
                </span>
              </div>
            )}
            {tour.services?.includes('tickets') && (
              <div className="bg-blue-50 text-blue-900 text-xs px-3 py-1.5 rounded-full flex items-center">
                <span className="mr-1 flex gap-2 items-center">
                  <img src={TicketsIcon} alt="Tickets" />
                  Билеты
                </span>
              </div>
            )}
            {tour.maxParticipants && (
              <div className="ml-auto">
                <span className="bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2">
                  <img src={RemainingIcon} alt="Remaining" />
                  {tour.maxParticipants} осталось мест
                </span>
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
              {tour.averageRating} ({tour.totalReviews} отзывов)
            </span>
          </div>
          <div className="flex items-center">
            <span className="p-1.5 bg-gray-100 mr-2 rounded-lg">
              <img src={LocationIcon} alt="Location" />
            </span>
            <span>{tour.city}</span>
          </div>
          <div className="flex items-center">
            <span className="p-1.5 bg-gray-100 mr-2 rounded-lg">
              <img src={DurationIcon} alt="Duration" />
            </span>
            <span>{calculateDuration(tour.startDate, tour.endDate)}</span>
          </div>
        </div>
        <div className="text-right text-blue-500 font-bold">
          От {tour.price.toLocaleString()} ₸
        </div>
      </div>
    </div>
  );
};
