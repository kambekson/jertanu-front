import heroimg1 from '../../../assets/hero1.png';
import heroimg2 from '../../../assets/hero2.png';
import heroimg3 from '../../../assets/hero3.png';
import heroimg4 from '../../../assets/hero4.png';

import TourSearchBar from '../../../UI/TourSearchBar.tsx';

// Массив с изображениями и названиями городов
const images = [
  { img: heroimg1, city: 'Астана' },
  { img: heroimg2, city: 'Ақтау' },
  { img: heroimg3, city: 'Алматы' },
  { img: heroimg4, city: 'Түркістан' },
];

export default function Hero() {
  return (
    <div className="container relative">
      <div className="py-3 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((item, index) => (
            <div
              key={index}
              className={`w-full h-[580px] relative ${
                index >= 1 && index < 2 ? 'hidden md:block' : index >= 2 ? 'hidden lg:block' : ''
              }`}
            >
              <img
                src={item.img}
                alt={`hero-img-${index + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-transparent bg-opacity-50 p-3 rounded-b-lg">
                <p className="text-white text-center font-xl font-bolder">{item.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <TourSearchBar />
    </div>
  );
}
