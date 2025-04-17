import { useState } from 'react';

interface TourFilter {
  id: string;
  label: string;
}

interface TourFiltersProps {
  filters: TourFilter[];
  selectedFilters: string[];
  onFilterChange: (filterId: string) => void;
}

export default function TourFilters({ filters, selectedFilters, onFilterChange }: TourFiltersProps) {
  const [isFilterTypesOpen, setIsFilterTypesOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isDaysOpen, setIsDaysOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);

  return (
      <>
        {/* Фильтровать по */}
        <div className="border-2 border-gray-300 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Фильтровать по</span>
            <button
                className="text-sm"
                onClick={() => setIsFilterTypesOpen(!isFilterTypesOpen)}
            >
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`feather ${isFilterTypesOpen ? 'feather-chevron-up' : 'feather-chevron-down'}`}
              >
                <polyline points={isFilterTypesOpen ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
              </svg>
            </button>
          </div>
          {isFilterTypesOpen && (
              <div className="mt-2 space-y-2">
                {filters.map((filter) => (
                    <div key={filter.id} className="flex items-center">
                      <input
                          type="checkbox"
                          id={filter.id}
                          className="mr-2"
                          checked={selectedFilters.includes(filter.id)}
                          onChange={() => onFilterChange(filter.id)}
                      />
                      <label htmlFor={filter.id} className="text-sm">
                        {filter.label}
                      </label>
                    </div>
                ))}
              </div>
          )}
        </div>

        {/* Цена */}
        <div className="border-2 border-gray-300 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Цена</span>
            <button className="text-sm" onClick={() => setIsPriceOpen(!isPriceOpen)}>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`feather ${isPriceOpen ? 'feather-chevron-up' : 'feather-chevron-down'}`}
              >
                <polyline points={isPriceOpen ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
              </svg>
            </button>
          </div>
          {isPriceOpen && (
              <div className="mt-4">
                <div className="flex gap-2">
                  <input
                      type="text"
                      placeholder="от ₸"
                      className="border rounded-md p-2 w-full text-sm"
                  />
                  <input
                      type="text"
                      placeholder="до ₸"
                      className="border rounded-md p-2 w-full text-sm"
                  />
                </div>
                <div className="mt-4">
                  <input type="range" min="0" max="5000000" className="w-full" />
                </div>
              </div>
          )}
        </div>

        {/* Кол-во дней */}
        <div className="border-2 border-gray-300 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Кол-во дней</span>
            <button className="text-sm" onClick={() => setIsDaysOpen(!isDaysOpen)}>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`feather ${isDaysOpen ? 'feather-chevron-up' : 'feather-chevron-down'}`}
              >
                <polyline points={isDaysOpen ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
              </svg>
            </button>
          </div>
          {isDaysOpen && (
              <div className="mt-2">
                <div className="flex justify-between text-sm">
                  <span>мин: 1 дня</span>
                  <span>21+ дней</span>
                </div>
                <div className="mt-4">
                  <input type="range" min="3" max="21" className="w-full" />
                </div>
              </div>
          )}
        </div>

        {/* Выбор рейтинга */}
        <div className="border-2 border-gray-300 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">Выбор рейтинга</span>
            <button className="text-sm" onClick={() => setIsRatingOpen(!isRatingOpen)}>
              <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`feather ${isRatingOpen ? 'feather-chevron-up' : 'feather-chevron-down'}`}
              >
                <polyline points={isRatingOpen ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
              </svg>
            </button>
          </div>
          {isRatingOpen && (
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="text-xl text-gray-300 hover:text-yellow-400">
                      ★
                    </button>
                ))}
              </div>
          )}
        </div>
      </>
  );
}