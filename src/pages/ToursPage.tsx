import { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import ToursLayout from '../components/Tours/ToursLayout.tsx';

enum TourType {
  ETHNO = 'ethno',
  NATURE = 'nature',
  CULTURAL = 'cultural',
  ADVENTURE = 'adventure',
  GASTRO = 'gastronomy',
  OTHER = 'other',
}

export type Tour = {
  id: number;
  title: string;
  imageUrls: string;
  price: number;
  discountPrice?: number;
  status: string;
  startDate: string;
  endDate: string;
  city: string;
  type: string;
  isActive: boolean;
  services: string[];
  averageRating: number;
  totalReviews: number;
  maxParticipants: number;
  hotelStar: number;
  location: string;
  duration: string;
};

const tourFilters = [
  { id: TourType.ETHNO, label: 'Этнографические туры' },
  { id: TourType.NATURE, label: 'Природные туры' },
  { id: TourType.CULTURAL, label: 'Культурные туры' },
  { id: TourType.ADVENTURE, label: 'Приключенческие туры' },
  { id: TourType.GASTRO, label: 'Гастрономические туры' },
  { id: TourType.OTHER, label: 'Другие туры' },
];

export default function ToursPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tours, setTours] = useState<Tour[]>([]);

  const handleFilterChange = (filterId: string) => {
    setSelectedFilters((prevFilters) => {
      if (prevFilters.includes(filterId)) {
        return prevFilters.filter((id) => id !== filterId);
      } else {
        return [...prevFilters, filterId];
      }
    });
  };

  useEffect(() => {
    if (selectedFilters.length === 0) {
      setFilteredTours(tours);
    } else {
      const filtered = tours.filter((tour) => selectedFilters.includes(tour.type));
      setFilteredTours(filtered);
    }
  }, [selectedFilters, tours]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const data = await apiService.get('/tours');
        setTours(data);
        setFilteredTours(data);
      } catch (err) {
        console.error('Ошибка при загрузке туров:', err);
        setError('Не удалось загрузить туры. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  return (
      <ToursLayout
          filters={tourFilters}
          selectedFilters={selectedFilters}
          onFilterChange={handleFilterChange}
          tours={filteredTours}
          loading={loading}
          error={error}
      />
  );
}