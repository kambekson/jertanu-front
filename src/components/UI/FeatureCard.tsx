import ArrowRightIcon from '../../assets/icons/arrow1.svg';

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
}

export default function FeatureCard({ number, title, description }: FeatureCardProps) {
  return (
    <div className="flex">
      <div className="bg-gray-100 p-4 sm:p-6 md:p-8 my-3 rounded-lg w-full">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="flex items-center">
            <span className="text-base sm:text-lg bg-white p-2 sm:p-2.5 rounded-lg text-blue-500 font-bold">
              {number}
            </span>
            <h3 className="ml-3 sm:ml-4 text-base sm:text-lg font-medium">{title}</h3>
          </div>

          <div className="flex-1 mt-3 sm:mt-0 md:pl-4 lg:pl-8">
            <p className="text-sm sm:text-base text-gray-600">{description}</p>
          </div>

          <div className="mt-4 sm:mt-0 sm:ml-4 flex justify-start sm:justify-end">
            <a
              href="#"
              className="inline-flex items-center justify-center px-3 sm:px-4 py-2 bg-blue-50 text-white rounded-md"
            >
              <img src={ArrowRightIcon} alt="" className="w-4 h-4 sm:w-auto sm:h-auto" />
              <span className="ml-2 sm:ml-3 text-sm sm:text-base text-blue-500 font-bold">Подробнее</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
