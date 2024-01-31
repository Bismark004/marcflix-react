import './App.css'
import Homepage from "./components/Hompepage";
import { BrowserRouter,  Routes, Route } from 'react-router-dom';
import MovieDetails from './pages/MovieDetails';


 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='movie/:id' element={<MovieDetails />} />

      </Routes>
    </BrowserRouter>
  )
}
export default App;