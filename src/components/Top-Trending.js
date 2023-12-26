import TopRated from './TopRatedMovies.js';
import TrendingSeries from './TrendingSeries.js';
import TopRatedSeries from './TopRatedSeries.js';
import Trending from './TrendingMovies';


function TopTrending() {
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