import './Homepage.css';
import Trending from './TrendingMovies';
import Top from './Top';
import TopRated from './TopRatedMovies.js';
import TrendingSeries from './TrendingSeries.js';
import TopRatedSeries from './TopRatedSeries.js';



function Homepage() {
    return (
        <div className='homepage'>
            <Top/>
            <Trending/>
            <TopRated/>
            <TrendingSeries/>
            <TopRatedSeries/>

            

    
        </div>
    )
}
export default Homepage;