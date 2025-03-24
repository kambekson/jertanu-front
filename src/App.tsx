import './App.css';
import Header from './components/layout/Header.tsx';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <div className="w-full max-w-[1320px] px-4 md:px-6 lg:px-8 mx-auto">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
