import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthModal from '../modals/AuthModal';
import logo from '../../assets/jertanu-logo.svg';

export default function Header() {
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get('token')) {
      setAuthOpen(true);
    }
  }, [searchParams]);

  return (
    <header className="flex justify-between p-4 bg-white">
      <div className="flex items-center">
        <a className="pb-2.5">
          <img src={logo} alt="logo" />
        </a>
        <div className="nav">
          <ul className="flex ">
            <li className="px-2 font-normal font-base">
              <a>Направления</a>
            </li>
            <li className="px-2 font-normal font-base">
              <a>Пакеты</a>
            </li>
          </ul>
        </div>
      </div>

      <button onClick={() => setAuthOpen(true)} className=" text-black px-4 py-2 ">
        Войти
      </button>
      <AuthModal isOpen={isAuthOpen} onClose={() => setAuthOpen(false)} />
    </header>
  );
}
