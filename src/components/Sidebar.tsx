import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-96 bg-gray-900 text-white transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-700 ease-in-out z-50`}
    >
      <button onClick={onClose} className="pt-4 pl-16 focus:outline-none text-gray-400">
        X Fechar
      </button>
      
      <nav className="p-16 space-y-2">
        <Link to="/" onClick={onClose} className="text-white block py-2">Home</Link>
        <hr />
        <h2 className="p-4 space-y-2 text-2xl">CATEGORIAS</h2>
        <Link to="/series" onClick={onClose} className="text-white block py-2">Series</Link>
        <Link to="/movies" onClick={onClose} className="text-white block py-2">Filmes</Link>
        <Link to="/trending" onClick={onClose} className="text-white block py-2">Trending</Link>
        <Link to="/genre/acao" onClick={onClose} className="text-white block py-2">Ação</Link>
        <Link to="/genre/animacao" onClick={onClose} className="text-white block py-2">Animação</Link>
        <Link to="/genre/comedia" onClick={onClose} className="text-white block py-2">Comédia</Link>
        <Link to="/genre/documentario" onClick={onClose} className="text-white block py-2">Documentário</Link>
        <Link to="/genre/drama" onClick={onClose} className="text-white block py-2">Drama</Link>
        <Link to="/genre/ficcao-cientifica" onClick={onClose} className="text-white block py-2">Ficção Científica</Link>
        <Link to="/genre/horror" onClick={onClose} className="text-white block py-2">Horror e Suspense</Link>
        <Link to="/genre/romance" onClick={onClose} className="text-white block py-2">Romance</Link>
      </nav>
    </div>
  );
};

export default Sidebar;
