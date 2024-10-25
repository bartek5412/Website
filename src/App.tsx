import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Navbar from './components/Navbar';
import About from './components/site_1';
import Tanstack from './components/tanstack';


function App() {
  return (
<div className="App">
      <Router>
        <header>
          <Navbar />
          </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/site_1" element={<About />} />
          <Route path="/tanstack" element={<Tanstack />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
