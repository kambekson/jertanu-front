import { useEffect, useRef, useState } from 'react';

interface StepProps {
  number: number;
  isRight?: boolean;
  title: string;
  description: string;
}

export default function Step({ number, isRight = false, title, description }: StepProps) {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef<HTMLDivElement>(null);

  // Calculate delays based on step number
  const animationDelay = (number - 1) * 300; // 300ms between each step
  const circleDelay = animationDelay + 200; // Circle appears slightly after the step

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element is 10% visible, trigger the animation
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once we've seen it, we don't need to observe anymore
          if (stepRef.current) {
            observer.unobserve(stepRef.current);
          }
        }
      },
      {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item visible
      }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={stepRef}
      className={`flex items-start md:gap-8 max-w-5xl mx-auto my-6 md:my-12 relative
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        transition-all duration-700 ease-out
        ${isRight ? 'md:flex-row-reverse' : ''}`}
      style={{ transitionDelay: `${animationDelay}ms` }}
    >
      {/* Mobile timeline layout (stacked vertically) */}
      <div className="md:hidden flex flex-col items-center w-full pl-8 relative">
        <div className="bg-white text-blue-500 inline-block px-2 py-1 rounded-md mb-2 text-xs font-medium">
          шаг {number}
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-full">
          <div className="text-white">
            <div className="font-medium mb-2 text-sm">{title}</div>
            <p className="text-xs opacity-80">{description}</p>
          </div>
        </div>
        {/* Mobile vertical line */}
        <div className="absolute left-0 top-3 bottom-0 w-px bg-white opacity-50 h-full"></div>
        {/* Mobile circle dot */}
        <div 
          className={`absolute left-0 top-3 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-2 border-blue-500 z-10
            ${isVisible ? 'scale-100' : 'scale-0'} 
            transition-transform duration-500 ease-out`}
          style={{ transitionDelay: `${circleDelay}ms` }}
        ></div>
      </div>

      {/* Desktop timeline layout (split left/right) */}
      <div className={`hidden md:block w-1/2 text-${isRight ? 'left' : 'right'}`}>
        <div className={`px-6 py-4 max-w-md ${isRight ? 'ml-0 mr-auto' : 'ml-auto mr-0'} `}>
          <div className="bg-white text-blue-500 inline-block px-3 py-1 rounded-md mb-2 text-sm font-medium">
            шаг {number}
          </div>
          <div className="text-white">
            <div className="font-medium mb-2">{title}</div>
            <p className="text-sm opacity-80">{description}</p>
          </div>
        </div>
      </div>
      <div className="hidden md:block w-1/2"></div>
      
      {/* Desktop center circle dot */}
      <div 
        className={`hidden md:block absolute left-1/2 top-0 transform -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full border-4 border-blue-500 z-10
          ${isVisible ? 'scale-100' : 'scale-0'} 
          transition-transform duration-500 ease-out`}
        style={{ transitionDelay: `${circleDelay}ms` }}
      ></div>
    </div>
  );
}
