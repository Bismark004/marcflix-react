import './App.css'
import Homepage from "./components/Hompepage";
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;