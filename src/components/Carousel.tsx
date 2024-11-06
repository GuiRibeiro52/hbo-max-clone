import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

interface CarouselSectionProps {
  title: string;
  items: Array<{ id: number; title?: string; name?: string; poster_path: string }>;
  type: 'movie' | 'serie';
}

const Carousel: React.FC<CarouselSectionProps> = ({ title, items, type }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1440, settings: { slidesToShow: 4, slidesToScroll: 1 } },
      { breakpoint: 1024, settings: { slidesToShow: 3.5, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 640, settings: { slidesToShow: 1.5, slidesToScroll: 1 } },
      { breakpoint: 400, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } },
    ],
  };

  return (
    <div className="max-h-[400px] max-w-[1512px] m-1">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id}> 
            <Link to={`/${type}/${item.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
                className="rounded-lg cursor-pointer w-[240px] h-[361px]"
              />
            </Link>
            {/* <p className="mt-2 text-gray-200">{item.title || item.name}</p>  */}
          </div>
        ))}
      </Slider>
    </div>
);

};

export default Carousel;
