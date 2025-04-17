import ToursHero from './ToursHero';
import TourFilters from './ToursFilters';
import ToursList from './ToursList';
import {Tour} from "../../pages/ToursPage.tsx"

interface TourFilter {
  id: string;
  label: string;
}

interface ToursLayoutProps {
  filters: TourFilter[];
  selectedFilters: string[];
  onFilterChange: (filterId: string) => void;
  tours: Tour[];
  loading: boolean;
  error: string | null;
}

export default function ToursLayout({
                                      filters,
                                      selectedFilters,
                                      onFilterChange,
                                      tours,
                                      loading,
                                      error,
                                    }: ToursLayoutProps) {
  return (
      <div>
        <ToursHero />
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-row gap-6">
            <div className="w-64 flex flex-col gap-4">
              <TourFilters
                  filters={filters}
                  selectedFilters={selectedFilters}
                  onFilterChange={onFilterChange}
              />
            </div>
            <div className="flex-1">
              <ToursList tours={tours} loading={loading} error={error} />
            </div>
          </div>
        </div>
      </div>
  );
}