import { Route, Routes } from 'react-router-dom';
import './App.css';
import FooterPart from './Components/FooterPart/FooterPart';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import CartProvider from './Context/CartManagement/CartProvider';
import HomePage from './Pages/HomePage/HomePage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import RestaurantDetails from './Pages/RestaurantDetails/RestaurantDetails';
import RestaurantList from './Pages/RestaurantList/RestaurantList';
import TableBookingPage from './Pages/TableBookingPage/TableBookingPage';
import TableTrackingPage from './Pages/TableTrackingPage/TableTrackingPage';

function App() {
  return (
    <div className="App">

      <CartProvider>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<RestaurantList />} />
          <Route path="/menu/:restaurentID" element={<RestaurantDetails />} />
          <Route path="/tablebooking" element={<TableBookingPage />} />
          <Route path="/tabletracking/:restaurentID" element={<TableTrackingPage />} />
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
        <FooterPart />

      </CartProvider>




    </div>
  );
}

export default App;
