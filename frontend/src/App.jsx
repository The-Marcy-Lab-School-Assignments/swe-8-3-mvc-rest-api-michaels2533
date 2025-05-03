import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import JokesDetails from './pages/JokeDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path='/api/joke/:id' element={<JokesDetails/>}></Route>
    </Routes>
  )
}

export default App