import { Link } from 'react-router-dom';
import logoIcon from '../assets/images/GR-transparente.svg';
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-4">
      <div className="container mx-auto text-center max-w-[1000px]">
        
        <div className="flex justify-center mb-4">
          <img src={logoIcon} alt="Logo" className="h-24" />
        </div>

        
        <div className="flex justify-center gap-10 space-x-6 mb-6 text-displaySmallBold">
          <Link to="/" className="hover:text-gray-400">Home</Link>
          <Link to="/movies" className="hover:text-gray-400">Filmes</Link>
          <Link to="/series" className="hover:text-gray-400">Séries</Link>
        </div>

        
        <p className="text-gray-400 text-sm mb-10">Bem-vindo à GRMaxPlus, uma plataforma de catálogo dedicada a oferecer uma experiência de entretenimento de alta qualidade, acessível e diversificada. Nosso catálogo é atualizado regularmente para trazer o melhor do cinema, séries, documentários e conteúdos exclusivos, adaptados a todas as idades e preferências. Lembramos que o acesso ao conteúdo está sujeito a disponibilidade, e a qualidade pode variar de acordo com a conexão do usuário. Para dúvidas, entre em contato conosco por meio das nossas redes sociais ou pelo suporte.
        </p>

        
        <div className="flex justify-center space-x-4 mb-10 gap-20">
          <a href="https://wa.me/+5516994664262" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300">
            <FaWhatsapp size={36} />
          </a>
          <a href="https://instagram.com/guilhermeribeiroo" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300">
            <FaInstagram size={36} />
          </a>
          <a href="https://linkedin.com/in/guilherme-ribeiro52" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300">
            <FaLinkedin size={36} />
          </a>
          <a href="https://github.com/GuiRibeiro52" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-300">
            <FaGithub size={36} />
          </a>
        </div>

        
        <p className="text-sm text-gray-500">
          Desenvolvido por <a href="https://www.guilhermeribeiro.dev.br" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-300">Guilherme Ribeiro</a>. Todos os direitos reservados.
        </p>
        
      </div>

    </footer>
  );
};

export default Footer;
