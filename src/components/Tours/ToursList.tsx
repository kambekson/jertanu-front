import { Link } from 'react-router-dom';
import { TourCardLarge } from '../../UI/TourCardLarge';
import { Tour } from '../../pages/ToursPage';

interface ToursListProps {
  tours: Tour[];
  loading: boolean;
  error: string | null;
}

export default function ToursList({ tours, loading, error }: ToursListProps) {
  return (
      <>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium">Найдено {tours.length} туров</h2>
          <div className="flex items-center">
            <span className="mr-2 text-sm">Сортировать по</span>
            <select className="border-2 border-gray-300 rounded-md p-2 text-sm">
              <option>Рекомендуемые</option>
              <option>Цена: от низкой к высокой</option>
              <option>Цена: от высокой к низкой</option>
              <option>Рейтинг</option>
            </select>
          </div>
        </div>

        {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
        ) : tours.length === 0 ? (
            <div className="text-center text-gray-500">Туры не найдены</div>
        ) : (
            <div className="flex flex-col gap-4">
              {tours.map((tour) => (
                  <Link to={`/tour/${tour.id}`} key={tour.id}>
                    <TourCardLarge tour={tour} />
                  </Link>
              ))}
            </div>
        )}
      </>
  );
}