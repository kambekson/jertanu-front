import Hero from '../components/sections/home page/Hero.tsx';
import HotTours from '../components/sections/home page/HotTours.tsx';
import PopularCities from '../components/sections/home page/PopularCities.tsx';
import heroimg1 from '../assets/hero1.png';
import heroimg2 from '../assets/hero2.png';
import heroimg3 from '../assets/hero3.png';
import heroimg4 from '../assets/hero4.png';
import SeasonTours from '../components/sections/home page/SeasonTours.tsx';

const tours = [
  {
    img: heroimg1,
    city: 'Астана',
    title: 'Экскурсия по столице',
    price: 25000,
    oldPrice: 35000,
    rating: 4.8,
    dates: '5-6 марта',
    isNew: true,
    discount: 30,
  },
  {
    img: heroimg2,
    city: 'Ақтау',
    title: 'Пляжный отдых',
    price: 32000,
    rating: 4.5,
    dates: '5-6 марта',
  },
  {
    img: heroimg3,
    city: 'Алматы',
    title: 'Горный тур',
    price: 28000,
    oldPrice: 33000,
    rating: 4.9,
    dates: '5-6 марта',
    discount: 15,
  },
  {
    img: heroimg4,
    city: 'Түркістан',
    title: 'Исторический тур',
    price: 22000,
    rating: 4.7,
    dates: '5-6 марта',
  },
  {
    img: heroimg1,
    city: 'Астана',
    title: 'Экскурсия по столице',
    price: 25000,
    oldPrice: 35000,
    rating: 4.8,
    dates: '5-6 марта',
    isNew: true,
    discount: 30,
  },
  {
    img: heroimg2,
    city: 'Ақтау',
    title: 'Пляжный отдых',
    price: 32000,
    rating: 4.5,
    dates: '5-6 марта',
  },
  {
    img: heroimg3,
    city: 'Алматы',
    title: 'Горный тур',
    price: 28000,
    oldPrice: 33000,
    rating: 4.9,
    dates: '5-6 марта',
    discount: 15,
  },
  {
    img: heroimg4,
    city: 'Түркістан',
    title: 'Исторический тур',
    price: 22000,
    rating: 4.7,
    dates: '5-6 марта',
  },
];

export default function HomePage() {
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
