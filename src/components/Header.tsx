import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import menuIcon from '../assets/images/menu.svg';
import searchIcon from '../assets/images/search.svg';
import logoIcon from '../assets/images/GR-transparente.svg';
import Sidebar from './Sidebar';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery(''); 
    }
  };

  return (
    <header className="absolute top-0 left-0 w-full flex items-center justify-between px-4 py-3 bg-transparent z-50">

      <button onClick={toggleSidebar} className="p-2 focus:outline-none">
        <img src={menuIcon} alt="Menu" className="w-6 h-6" />
      </button>


      <Link to="/" className="flex-grow flex justify-center">
        <img src={logoIcon} alt="Logo" className="h-16" />
      </Link>

     
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar"
          className="bg-gray-800 bg-opacity-50 text-white rounded-lg px-4 py-2 outline-none transition-all duration-300 ease-in-out"
        />
        <button onClick={handleSearchSubmit} className="p-2 focus:outline-none">
          <img src={searchIcon} alt="Buscar" className="w-6 h-6" />
        </button>
      </div>

  
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </header>
  );
};

export default Header;
