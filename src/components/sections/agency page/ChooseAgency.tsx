import { useEffect, useRef, useState } from 'react';
import Feature from '../../UI/Feature';
import Step from '../../UI/Step';
import planeBg from '../../../assets/icons/plane-ico.png';
import chooseBg from '../../../assets/choose-agency-bg.png';

// Define the steps data
const stepsData = [
  {
    number: 1,
    isRight: false,
    title: "Зарегистрируйтесь в сервисе JerTanu как тур-агент и откройте доступ к сервисам",
    description: ""
  },
  {
    number: 2,
    isRight: true,
    title: "Получите бесплатный тестовый доступ в личный кабинет JerTanu на 10 дней и оцените все возможности",
    description: ""
  },
  {
    number: 3,
    isRight: false,
    title: "Выберите подходящий тариф, оплатите услуги и получите доступ к сервисам JerTanu",
    description: ""
  },
  {
    number: 4,
    isRight: true,
    title: "Ваше агентство - новый счастливый пользователь сервисов JerTanu, получайте больше готовых заявок на туры и следите за новыми предложениями",
    description: ""
  }
];

export default function ChooseAgency() {
  const [timelineVisible, setTimelineVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimelineVisible(true);
          if (timelineRef.current) {
            observer.unobserve(timelineRef.current);
          }
        }
      },
      {
        threshold: 0.2
      }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => {
      if (timelineRef.current) {
        observer.unobserve(timelineRef.current);
      }
    };
  }, []);

  return (
    <div>
      <div className="container">
        <div>
          <h2 className="text-3xl font-bold text-blue-800 mb-8">Почему выбирают JerTanu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-15 mb-30">
            <Feature
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              }
              title="Надежный партнер"
              description="многолетнее сотрудничество с 3000 + туроператорами в России и странах СНГ"
            />
            <Feature
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
                </svg>
              }
              title="Более 90 туроператоров в системе"
              description="всегда актуальные данные о турах и ценах, постоянное отслеживание и добавление новых туроператоров"
            />
            <Feature
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
                </svg>
              }
              title="Постоянное развитие сервисов"
              description="более 10 лет разработки, клиентоориентированная поддержка, постоянное развитие сервисов"
            />
            <Feature
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" />
                </svg>
              }
              title="Интеграция с популярными CRM"
              description="и IT-сервисами, экспорт туров и заявок в CRM. Заполнение параметров тура в договоре всего за 1 клик"
            />
          </div>
        </div>
      </div>

      <div className="bg-white relative">
        <img src={chooseBg} alt="Background" className="h-[968px] w-full" />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img src={planeBg} alt="Plane icon" />
        </div>

        <div className="absolute inset-0 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-white text-center mb-4 mt-24">
            Как начать сотрудничество
            <br />с JerTanu
          </h2>

          <div ref={timelineRef} className="relative w-full">
            <div 
              className={`absolute left-1/2 top-0 bottom-0 w-px bg-white opacity-50 transform -translate-x-1/2
                ${timelineVisible ? 'h-full' : 'h-0'} 
                transition-all duration-1000 ease-in-out`}
              style={{ transitionDelay: '200ms' }}
            ></div>
            
            {stepsData.map((step) => (
              <Step
                key={step.number}
                number={step.number}
                isRight={step.isRight}
                title={step.title}
                description={step.description}
              />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
