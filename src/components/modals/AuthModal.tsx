import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ForgotPasswordForm from './ForgotPasswordForm';
import ResetPasswordForm from './ResetPasswordForm';
import { X } from 'lucide-react';
import authbg1 from '../../assets/auth-modal1.jpg';
import authbg2 from '../../assets/auth-modal2.jpg';
import authbg3 from '../../assets/auth-modal3.jpg';
import logo from '../../assets/jertanu-logo-white.svg';


interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'forgot' | 'reset' | 'verify' | 'register';
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  // Преобразуем 'register' в 'signup' для внутреннего использования
  const resolveView = (mode: string): 'login' | 'signup' | 'forgot' | 'reset' | 'verify' => {
    if (mode === 'register') return 'signup';
    return mode as 'login' | 'signup' | 'forgot' | 'reset' | 'verify';
  };
  
  const [view, setView] = useState<'login' | 'signup' | 'forgot' | 'reset' | 'verify'>(
    resolveView(initialMode)
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Обновляем view при изменении initialMode
  useEffect(() => {
    setView(resolveView(initialMode));
  }, [initialMode]);
  
  // Данные для карусели (изображения и слоганы)
  const carouselData = [
    {
      image: authbg1, // Используем существующее изображение как первое
      slogan: "Исследуйте страну, одно направление за другим"
    },
    {
      image: authbg2, // Замените на другие изображения
      slogan: "Откройте для себя новые горизонты путешествий"
    },
    {
      image: authbg3, // Замените на другие изображения
      slogan: "Создавайте незабываемые моменты вместе с нами"
    }
  ];

  // Автоматическая смена слайдов
  useEffect(() => {
    if (!isOpen) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselData.length);
    }, 5000); // Смена каждые 5 секунд
    
    return () => clearInterval(interval);
  }, [isOpen, carouselData.length]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="bg-white rounded-[24px] shadow-xl w-[900px] h-[600px] relative flex overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <X size={20} />
        </button>
        
        <div className="w-1/2 p-8">
          {view === 'login' && <LoginForm switchView={setView} />}
          {view === 'signup' && <SignupForm switchView={setView} />}
          {view === 'forgot' && <ForgotPasswordForm switchView={setView} />}
          {view === 'reset' && <ResetPasswordForm switchView={setView} />}
          {view === 'verify' && <SignupForm switchView={setView} />}
        </div>

        <div className="w-1/2 relative">
          {carouselData.map((slide, index) => (
            <div 
              key={index} 
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={slide.image} 
                alt={`Слайд ${index + 1}`} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
            </div>
          ))}
          
          <div className="absolute top-6 left-8">
            <img src={logo} alt="JerTanu" className="h-6" />
          </div>
          
          <div className="absolute bottom-16 left-8 right-8 text-white">
            <div className="h-[96px] relative">
              {carouselData.map((slide, index) => (
                <h2 
                  key={index}
                  className={`text-[32px] font-bold leading-tight absolute inset-0 transition-all duration-1000 ${
                    index === currentSlide 
                      ? 'opacity-100 transform translate-y-0' 
                      : 'opacity-0 transform translate-y-4'
                  }`}
                >
                  {slide.slogan}
                </h2>
              ))}
            </div>
            
            <div className="flex gap-2 mt-8 absolute bottom-[-40px] left-0">
              {carouselData.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
                    index === currentSlide ? 'bg-white' : 'bg-white/30'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}