import './Homepage.css';
import Trending from './TrendingMovies';
import Top from './Top';
import TopRated from './TopRatedMovies.js';



function Homepage() {
    return (
        <div className='homepage'>
            <Top/>
            <Trending/>
            <TopRated/>
            

    
        </div>
    )
}
export default Homepage;