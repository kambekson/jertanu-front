interface Tour {
  img: string;
  city: string;
}

const PopularCities = ({ tours }: { tours: Tour[] }) => {
  return (
    <div className="container py-[50px]">
      <div className="flex justify-between items-center my-6">
        <h1 className="font-bold text-2xl">Популярные города</h1>
        <a href="#" className="text-xl font-medium text-gray-500">
          Посмотреть все
        </a>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
        {tours.slice(0, 6).map((tour: Tour, index: number) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
            <img src={tour.img} alt={tour.city} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 right-0 text-center py-2 bg-black/50">
              <p className="text-white font-medium">{tour.city}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularCities;
