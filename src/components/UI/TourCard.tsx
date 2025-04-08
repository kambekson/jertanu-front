import { FaStar } from 'react-icons/fa';

interface Tour {
  img: string;
  city: string;
  isNew?: boolean;
  discount?: number;
  title: string;
  rating: number;
  dates: string;
  oldPrice?: number;
  price: number;
  textColor?: string;
}

const TourCard = ({ tour }: { tour: Tour }) => {
  return (
    <div className="min-w-[33.333%] px-2">
      <div className="w-full relative bg-transparent rounded-lg overflow-hidden">
        <div className="relative rounded-lg overflow-hidden">
          <img src={tour.img} alt={tour.city} className="w-full h-[320px] object-cover" />
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {tour.isNew && (
              <div className="bg-blue-50 font-normal text-blue-500 px-3 py-1 rounded-2xl text-sm">
                Новый тур
              </div>
            )}
            {tour.discount && (
              <div className="bg-blue-400 font-normal text-white px-2 py-1 rounded-2xl text-sm">
                Скидка {tour.discount}%
              </div>
            )}
          </div>
        </div>
        <div className="py-1">
          <div className="flex justify-between items-center">
            <h3 className={`font-bold text-lg ${tour.textColor || ''}`}>{tour.title}</h3>
            {tour.rating > 0 && (
              <div className="flex items-center mt-2">
                <FaStar className={tour.textColor || 'text-black'} />
                <span className={`ml-1 ${tour.textColor || ''}`}>{tour.rating}</span>
              </div>
            )}
          </div>
          <p className={tour.textColor || 'text-gray-600'}>{tour.city}</p>
          <div className="flex justify-between items-center">
            <p className={`${tour.textColor || 'text-gray-600'} mt-2 font-base`}>{tour.dates}</p>
            <div className="mt-2 flex items-center">
              {tour.oldPrice && (
                <span
                  className={`mr-2 ${tour.textColor || 'text-gray-500'} line-through font-base text-sm`}
                >
                  {tour.oldPrice.toLocaleString()} ₸
                </span>
              )}
              <span className={`font-bold text-sm font-base ${tour.textColor || ''}`}>
                От {tour.price.toLocaleString()} ₸
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
