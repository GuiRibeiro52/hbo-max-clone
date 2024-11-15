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
    infinite: false,
    speed: 500,
    slidesToShow: isLarge ? 3.5 : 6,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: isLarge ? 2 : 4, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: isLarge ? 1.5 : 3.5, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1.5, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1, slidesToScroll: 1 } },
      { breakpoint: 400, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } },
    ],
  };

  return (
    <div className="m-1">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id}>
            {renderItem ? (
              renderItem(item) // Se renderItem for fornecido, use-o para renderizar o item
            ) : (
              <Link to={`/${type}/${item.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/${isLarge ? 'w780' : 'w300'}${isLarge ? item.backdrop_path : item.poster_path}`}
                  alt={item.title || item.name}
                  className={`rounded-lg cursor-pointer ${isLarge ? 'w-[500px] h-[281px]' : 'w-[240px] h-[361px]'}`}
                />
                <p className={`text-center ${isLarge ? 'max-w-[500px]' : 'max-w-[240px]'}`}>
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
