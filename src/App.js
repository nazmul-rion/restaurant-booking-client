import { Route, Routes } from 'react-router-dom';
import './App.css';
import FooterPart from './Components/FooterPart/FooterPart';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import HomePage from './Pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">


      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<HomePage />} />
        <Route path="/tablebooking" element={<HomePage />} />
        <Route path="/tabletracking" element={<HomePage />} />

      </Routes>
      <FooterPart />






    </div>
  );
}

export default App;
