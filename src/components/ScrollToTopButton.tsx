import React, { useState, useEffect } from 'react';
import { FaCircleArrowUp } from "react-icons/fa6";

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

 
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

 
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-6 p-3 rounded-full 0 text-white transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-label="Scroll to top"
    >
      <FaCircleArrowUp size={50}/>
    </button>
  );
};

export default ScrollToTopButton;
