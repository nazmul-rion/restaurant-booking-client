import { Route, Routes } from 'react-router-dom';
import './App.css';
import FooterPart from './Components/FooterPart/FooterPart';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import CartProvider from './Context/CartManagement/CartProvider';
import AdminPage from './Pages/AdminPage/AdminPage';
import AddRestaurent from './Pages/AdminPage/Outlet/AddRestaurent';
import AllRestaurentList from './Pages/AdminPage/Outlet/AllRestaurentList';
import HomePage from './Pages/HomePage/HomePage';
import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';
import RestaurantDetails from './Pages/RestaurantDetails/RestaurantDetails';
import RestaurantList from './Pages/RestaurantList/RestaurantList';
import AllorderList from './Pages/RestaurentAdmin/Outlet/AllorderList';
import MenuEdit from './Pages/RestaurentAdmin/Outlet/MenuEdit';
import MyRestaurant from './Pages/RestaurentAdmin/Outlet/MyRestaurant';
import SingleOrderDetails from './Pages/RestaurentAdmin/Outlet/SingleOrderDetails';
import TableInfoEdit from './Pages/RestaurentAdmin/Outlet/TableInfoEdit';
import TableTrackingEdit from './Pages/RestaurentAdmin/Outlet/TableTrackingEdit';

import RestaurantDasboard from './Pages/RestaurentAdmin/RestaurantDasboard';
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

          <Route path="/adminpage" element={<AdminPage />} >
            <Route path="allrestaurent" element={<AllRestaurentList />} />
            <Route path="addrestaurent" element={<AddRestaurent />} />
          </Route>

          <Route path="/restaurantadminpage" element={<MyRestaurant />} />

          <Route path="/restaurantadminpage/:restaurantID" element={<RestaurantDasboard />} >
            <Route path="allorders" element={<AllorderList />} />
            <Route path="allorders/:orderID" element={<SingleOrderDetails />} />
            <Route path="allmenu" element={<MenuEdit />} />
            <Route path="alltable" element={<TableTrackingEdit />} />
            <Route path="edittable" element={<TableInfoEdit />} />
          </Route>


          <Route path="*" element={<NotFoundPage />} />

        </Routes>
        <FooterPart />

      </CartProvider>




    </div>
  );
}

export default App;
