import toursHero from '../../../assets/toursHero.jpg';
import FeatureCard from '../../../components/UI/FeatureCard';
import Button from '../../UI/Button';

export default function AgencyFeatures() {
  // Define features data
  const features = [
    {
      number: '01.',
      title: 'Удобная система поиска туров',
      description:
        'Современный интерфейс подбора туров с доступом к актуальной базе предложений, горящим турам и возможностью мгновенного бронирования через нашу платформу',
    },
    {
      number: '02.',
      title: 'Система бронирования туров',
      description:
        'Система бронирования туров с возможностью мгновенного бронирования через нашу платформу',
    },
    {
      number: '03.',
      title: 'Система управления заявками',
      description:
        'Система управления заявками с функциями управления заявками клиентов, создания подборок туров, отслеживания статусов заказов и аналитикой продаж для увеличения эффективности бизнеса',
    },
    {
      number: '04.',
      title: 'Увеличение клиентской базы',
      description:
        'Доступ к платформе JerTanu позволит вам получать заявки от клиентов, которые используют наш сервис для поиска туров. Возможность быстрого оформления заказа онлайн',
    },
    {
      number: '05.',
      title: 'Личный кабинет для управления заявками',
      description:
        'Личный кабинет с функциями управления заявками клиентов, создания подборок туров, отслеживания статусов заказов и аналитикой продаж для увеличения эффективности бизнеса',
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1c3b5a] mb-8 sm:mb-12 text-center md:text-left">
          Возможности JerTanu для турагентств
        </h2>
        <div className="space-y-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              number={feature.number}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* Search modules section */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-6 sm:mb-8 text-center md:text-left">
            Готовые модули для вашего сайта
          </h2>

          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            <Button variant="primary" className="text-sm sm:text-base">
              Удобная система поиска туров
            </Button>
            <Button variant="neutral" className="text-sm sm:text-base">
              Система бронирования туров
            </Button>
            <Button variant="neutral" className="text-sm sm:text-base">
              Система управления заявками
            </Button>
            <Button variant="neutral" className="text-sm sm:text-base">
              Увеличение клиентской базы
            </Button>
            <Button variant="neutral" className="text-sm sm:text-base">
              Личный кабинет для управления заявками
            </Button>
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
              <img
                src={toursHero}
                alt="Модуль поиска туров JerTanu"
                className="w-full rounded-md border-2 border-gray-200"
              />
            </div>

            <div className="flex flex-col justify-center mt-6 lg:mt-0">
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                Современная система поиска и бронирования туров для вашего сайта. Простой интерфейс,
                актуальные предложения и прозрачные цены.
              </h3>

              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-start sm:items-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base">
                    Актуальные туры и цены в реальном времени
                  </span>
                </li>
                <li className="flex items-start sm:items-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base">
                    Интуитивно понятный интерфейс с гибкими фильтрами
                  </span>
                </li>
                <li className="flex items-start sm:items-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base">
                    Безопасное онлайн-бронирование и оплата
                  </span>
                </li>
                <li className="flex items-start sm:items-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base">
                    Полная стоимость с учетом всех сборов и налогов
                  </span>
                </li>
                <li className="flex items-start sm:items-center">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-100 flex items-center justify-center mr-2 sm:mr-3 mt-0.5 sm:mt-0 flex-shrink-0">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base">
                    Быстрая загрузка и оптимизация конверсии
                  </span>
                </li>
              </ul>

              <div className="mt-6 sm:mt-8 flex justify-center md:justify-start">
                <Button variant="secondary" className="w-full sm:w-auto">
                  Увеличение клиентской базы
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
