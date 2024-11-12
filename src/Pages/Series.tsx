import { useEffect, useState } from 'react';
import { getPopularSeries, getTopRatedSeries, getTrendingSeries, getUpcomingSeries } from '../api/tmdb';
import Carousel from '../components/Carousel';
import Banner from '../components/Banner';
import { MediaItem } from '../types';

const Series = () => {
  const [randomSeries, setRandomSeries] = useState<MediaItem | null>(null);
  const [newReleases, setNewReleases] = useState<MediaItem[]>([]);
  const [popularSeries, setPopularSeries] = useState<MediaItem[]>([]);
  const [topRatedSeries, setTopRatedSeries] = useState<MediaItem[]>([]);
  const [upcomingSeries, setUpcomingSeries] = useState<MediaItem[]>([]);

  useEffect(() => {
    const fetchSeries = async () => {

      const newReleasesData = await getTrendingSeries();
      setNewReleases(newReleasesData);


      const popularData = await getPopularSeries();
      setPopularSeries(popularData);


      const topRatedData = await getTopRatedSeries();
      setTopRatedSeries(topRatedData);


      const upcomingData = await getUpcomingSeries();
      setUpcomingSeries(upcomingData);


      const allSeries = [...newReleasesData, ...popularData];
      const randomIndex = Math.floor(Math.random() * allSeries.length);
      setRandomSeries(allSeries[randomIndex]);
    };

    fetchSeries();
  }, []);

  return (
    <div className="text-white mx-auto flex flex-col min-h-screen">
      {randomSeries && (
        <Banner
          title={randomSeries.name || "Série Indisponível"}
          description={randomSeries.overview}
          backdrop_path={randomSeries.backdrop_path || ""}
          id={randomSeries.id}
          type="serie"
        />
      )}
      <div className="p-10 bg-gradient-to-b from-black via-purple100 to-black">
        <Carousel title="Lançamentos" items={newReleases} type="serie" />
        <Carousel title="Populares" items={popularSeries} type="serie" />
        <Carousel title="Mais bem avaliadas" items={topRatedSeries} type="serie" />
        <Carousel title="Em breve" items={upcomingSeries} type="serie" />
      </div>
    </div>
  );
};

export default Series;
