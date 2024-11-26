import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

interface CarouselItemProps {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  backdrop_path?: string;
}

interface CarouselSectionProps {
  title: string;
  items: CarouselItemProps[];
  type: 'movie' | 'serie' | 'season';
  isLarge?: boolean;
  renderItem?: (item: CarouselItemProps) => React.ReactNode;
}

const Carousel: React.FC<CarouselSectionProps> = ({ title, items, type, isLarge = false, renderItem }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isLarge ? 4 : 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: isLarge ? 3 : 5, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: isLarge ? 2 : 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: isLarge ? 2 : 3, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: isLarge ? 1 : 2, slidesToScroll: 1, arrows: false } },
      { breakpoint: 400, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } },
    ],
  };

  return (
    <div className="m-1">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="px-2"> 
            {renderItem ? (
              renderItem(item) 
            ) : (
              <Link to={`/${type}/${item.id}`}>
                <div className="relative w-full h-0 pb-[150%] overflow-hidden">
                  <img
                    src={`https://image.tmdb.org/t/p/${isLarge ? 'w780' : 'w300'}${isLarge ? item.backdrop_path : item.poster_path}`}
                    alt={item.title || item.name}
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg cursor-pointer"
                  />
                </div>
                <p className="text-center mt-2">
                  {item.title || item.name}
                </p>
              </Link>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
