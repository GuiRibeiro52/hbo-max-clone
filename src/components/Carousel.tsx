import React from 'react';
import Slider from 'react-slick';

interface CarouselSectionProps {
  title: string;
  items: Array<{ id: number; title: string; posterPath: string }>;
}

const CarouselSection: React.FC<CarouselSectionProps> = ({ title, items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="carousel-section my-8">
      <h2 className="text-xl font-semibold mb-4 text-white">{title}</h2>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="px-2">
            <img
              src={`https://image.tmdb.org/t/p/w300${item.posterPath}`}
              alt={item.title}
              className="rounded-lg"
            />
            <p className="text-center mt-2 text-gray-200">{item.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselSection;
