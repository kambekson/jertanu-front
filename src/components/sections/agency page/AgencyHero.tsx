import jertanuLogo from '../../../assets/jertanu-logo-white.svg';
import Button from '../../UI/Button';
import agencyHeroBg from '../../../assets/hero-agency-bg.png';
import ClientScreen from "../../../assets/client-snap.png"
import { useNavigate } from 'react-router-dom';

export default function AgencyHero() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={agencyHeroBg}
          alt="Agency Hero Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="text-white max-w-lg w-full md:w-1/2 mb-8 md:mb-0">
          <img src={jertanuLogo} alt="JerTanu Logo" className="h-10 sm:h-12 md:h-16 mb-4 md:mb-6" />
          <p className="text-lg sm:text-xl mb-6 sm:mb-8">Лучшие возможности для подбора тура и роста продаж</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="secondary" 
              className="w-full sm:w-auto"
              onClick={() => navigate('/agency/register')}
            >
              Зарегистрироваться
            </Button>
            <Button 
              variant="neutral" 
              className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-gray-900"
              onClick={() => navigate('/agency/login')}
            >
              Войти
            </Button>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="bg-white p-2 sm:p-3 rounded-xl shadow-lg">
              <div className="flex items-center gap-1 mb-2">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <span className="ml-1 text-xs text-gray-500">JerTanu for Agencies</span>
              </div>
              <img
                src={ClientScreen}
                alt="JerTanu Travel Interface"
                className="w-full rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
