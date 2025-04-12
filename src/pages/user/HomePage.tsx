import { useState, useEffect } from 'react';
import Hero from '../../components/sections/home page/Hero.tsx';
import HotTours from '../../components/sections/home page/HotTours.tsx';
import PopularCities from '../../components/sections/home page/PopularCities.tsx';
import SeasonTours from '../../components/sections/home page/SeasonTours.tsx';
import heroimg1 from '../../assets/hero1.png';
import heroimg2 from '../../assets/hero2.png';
import heroimg3 from '../../assets/hero3.png';
import heroimg4 from '../../assets/hero4.png';

// Массив изображений для маппинга с данными API
const imageMap = {
  'Астана': heroimg1,
  'Ақтау': heroimg2,
  'Алматы': heroimg3,
  'Түркістан': heroimg4,
  // Значение по умолчанию, если город не найден
  'default': heroimg1
};


export default function HomePage() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/tours');
        
        if (!response.ok) {
          throw new Error(`Ошибка при получении данных: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Преобразование данных API в формат, ожидаемый компонентами
        const formattedTours = data.map((tour: any) => ({
          id: tour.id,
          img: (tour.imageUrls && tour.imageUrls.length > 0) ? tour.imageUrls[0] : '',
          city: tour.city,
          title: tour.title,
          price: tour.price,
          oldPrice: tour.oldPrice,
          rating: tour.averageRating || 0,
          totalReviews: tour.totalReviews || 0,
          dates: `${new Date(tour.startDate).toLocaleDateString()} - ${new Date(tour.endDate).toLocaleDateString()}`,
          statuses: tour.status,
          discount: tour.discount
        }));
        
        setTours(formattedTours);
      } catch (err) {
        console.error('Ошибка при загрузке туров:', err);
        setError('Не удалось загрузить туры. Пожалуйста, попробуйте позже.');
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  // Если данные загружаются, показываем индикатор загрузки
  if (loading) {
    return <div className="container py-20 text-center">Загрузка туров...</div>;
  }

  // Если произошла ошибка, показываем сообщение об ошибке
  if (error) {
    return <div className="container py-20 text-center text-red-500">{error}</div>;
  }

  // Если туры не найдены, показываем соответствующее сообщение
  if (!tours.length) {
    return <div className="container py-20 text-center">Туры не найдены</div>;
  }

  return (
    <div className="py-3">
      <Hero />
      <div className="py-12">
        <HotTours tours={tours} />
        <PopularCities tours={tours} />
        <SeasonTours tours={tours} />
      </div>
    </div>
  );
}
