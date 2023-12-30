import TopRated from './TopRatedMovies.js';
import Trending from './TrendingMovies.js';
import TopRatedSeries from './TopRatedSeries.js';
import TrendingSeries from './TrendingSeries.js';


function TopTrending () {
    return (
        <>
          <Trending/>
            <TopRated/>
            <TrendingSeries/>
            <TopRatedSeries/>

        </>
    )
}
export default TopTrending;