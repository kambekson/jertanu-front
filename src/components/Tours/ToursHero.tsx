import toursHero from '../../assets/toursHero.jpg';
import TourSearchBar from '../UI/TourSearchBar.tsx';

export default function ToursHero() {
  return (
    <div>
      <div className="relative">
        <img src={toursHero} className="h-[204px] w-full object-cover" alt="tour search area"></img>
        <div className="absolute flex flex-row inset-1 items-center justify-center">
          <TourSearchBar />
        </div>
      </div>
    </div>
  );
}
