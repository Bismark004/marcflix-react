import React from 'react';
import { BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import Homepage from './components/Hompepage';
import MovieDetails from './pages/MovieDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/"  element={<Homepage/>} />
        <Route path="/movie/:id" element={<MovieDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
