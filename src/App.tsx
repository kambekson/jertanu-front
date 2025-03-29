import './App.css';
import './styles/main.scss';
import Header from './components/layout/Header.tsx';
import { Outlet } from 'react-router-dom';
import Footer from './components/layout/Footer.tsx';
function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
