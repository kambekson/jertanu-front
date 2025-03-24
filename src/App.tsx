import './App.css';
import './styles/main.scss';
import Header from './components/layout/Header.tsx';
import { Outlet } from 'react-router-dom';
function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
