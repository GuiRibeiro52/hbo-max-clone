import { useState } from 'react';
import { Link } from 'react-router-dom';
import menuIcon from '../assets/images/menu.svg';
import searchIcon from '../assets/images/search.svg';
import logoIcon from '../assets/images/GR-transparente.svg';
import Sidebar from './Sidebar';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-transparent z-50">
      
      <button onClick={toggleSidebar} className="p-2 focus:outline-none">
        <img src={menuIcon} alt="Menu" className="w-6 h-6" />
      </button>

     
      <Link to="/" className="flex-grow flex justify-center">
        <img src={logoIcon} alt="Logo" className="h-16" />
      </Link>

    
      <button className="p-2 focus:outline-none">
        <img src={searchIcon} alt="Buscar" className="w-6 h-6" />
      </button>

     
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

    </header>
  );
};

export default Header;
