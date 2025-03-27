import { Link } from 'react-router-dom';
import TopMenu from '../components/UI/TopMenu';
import { Key } from 'lucide-react';

const TourInfo = () => {
  // Replace these URLs with your own image URLs
  const images = {
    img1: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', // Coastal town
    img2: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f', // Florence Duomo
    img3: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a', // Venice canal
    img4: 'https://images.unsplash.com/photo-1519681393784-d120267933ba', // Sunset cityscape
    img5: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd', // Colosseum
  };

  const locations = ['kolsay', 'kolsay', 'kolsay', 'kolsay', 'kolsay', 'kolsay', 'kolsay'];

  return (
    <div className="container mt-7">
      <div className="image-grid grid grid-cols-4 grid-rows-2 gap-5 h-[500px]">
        <div className="col-span-2 row-span-2 image-container">
          <img
            src={images.img4}
            alt="Sunset cityscape"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-1 image-container">
          <img
            src={images.img1}
            alt="Coastal town"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-1 image-container">
          <img
            src={images.img2}
            alt="Florence Duomo"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-1 image-container">
          <img
            src={images.img3}
            alt="Venice canal"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="col-span-1 row-span-1 image-container relative">
          <img
            src={images.img5}
            alt="Colosseum"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="overlay absolute inset-0 flex items-end justify-end p-4">
            <Link to="/tour" className="text-white font-bold text-sm">
              (28+) VIEW MORE
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div>
          <h2 className="text-2xl font-semibold text-blue-900">
            Italy in 21 Days: A Journey Through Art, History, and Culture
          </h2>
          <p className="text-gray-600 pt-6">
            Embark on a 21-day Italian adventure that takes you from the bustling streets of Rome to
            the serene landscapes of Tuscany, the romantic canals of Venice, and beyond. With ample
            time in each destination, this trip offers a perfect balance of exploration, relaxation,
            and cultural immersion.
          </p>
        </div>
        {/* <div className='py-12'>
          <TopMenu/>
        </div> */}
        <div className="flex flex-col">
          <div className="flex flex-row">
            <div>
              <h3 className="py-7 font-medium text-2xl text-blue-900">Длительность</h3>
              <p>21 days in total, starting and ending in London.</p>
              <div className="grid grid-cols-5 grid-rows-2 gap-3 py-4">
                {locations.map((location) => (
                  <div className="rounded-lg border-2 border-gray-400" key={location}>
                    <p className="px-3 py-1">{location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TourInfo;
