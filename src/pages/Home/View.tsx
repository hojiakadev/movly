import { useMovies } from '@/modules/movies/hooks';

import Hero from '@/pages/Home/sections/Hero';

const Home = () => {
  const { data } = useMovies();
  return (
    <div>
      <Hero movies={data || []} onPlay={movie => console.log('play', movie.title)} />
    </div>
  );
};

export default Home;
