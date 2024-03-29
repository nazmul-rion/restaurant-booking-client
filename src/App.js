import { Route, Routes } from 'react-router-dom';
import AdminRoute from './Routes/AdminRoute';
import './App.css';
import FooterPart from './Components/FooterPart/FooterPart';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import AuthProvider from './Context/AuthProvider';
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
import RestaurantAdminRoute from './Routes/RestaurantAdminRoute';
import LoginPage from './Pages/LoginPage/LoginPage';
import RegisterPage from './Pages/RegisterPage/RegisterPage';
import UserDashBoard from './Pages/UserDashBoard/UserDashBoard';
import DashBoardRoute from './Routes/DashBoardRoute';
import CustomerRoute from './Routes/CustomerRoute';


function App() {
  return (
    <div className="App">

      <AuthProvider >

        <CartProvider>

          <Routes>

            <Route path="/" element={<><NavigationBar /><HomePage /> <FooterPart /></>} />

            <Route path="/menu" element={<><NavigationBar /><RestaurantList /> <FooterPart /></>} />

            <Route path="/menu/:restaurentID" element={<><NavigationBar /><RestaurantDetails /> <FooterPart /></>} />

            <Route path="/tablebooking" element={<><CustomerRoute><NavigationBar /><TableBookingPage /> <FooterPart /></CustomerRoute></>} />

            <Route path="/tabletracking/:restaurentID" element={<><NavigationBar /><TableTrackingPage /> <FooterPart /></>} />

            <Route path="/dashboard" element={<DashBoardRoute></DashBoardRoute>} />

            <Route path="/userdashboard" element={<><CustomerRoute><NavigationBar /><UserDashBoard /> <FooterPart /></CustomerRoute></>} />
            <Route path="/userdashboard/:orderID" element={<><CustomerRoute><NavigationBar /><SingleOrderDetails /> <FooterPart /></CustomerRoute></>} />

            <Route path="/login" element={<><NavigationBar /><LoginPage /> <FooterPart /></>} />
            <Route path="/register" element={<><NavigationBar /><RegisterPage /> <FooterPart /></>} />

            <Route
              path="/adminpage" element={<AdminRoute><AdminPage /></AdminRoute>}>
              <Route path="allrestaurent" element={<AllRestaurentList />} />
              <Route path="addrestaurent" element={<AddRestaurent />} />
            </Route>

            <Route path="/restaurantadminpage"
              element={<RestaurantAdminRoute><MyRestaurant /></RestaurantAdminRoute>} />

            <Route path="/restaurantadminpage/:restaurantID" element={<RestaurantDasboard />} >
              <Route path="allorders" element={<AllorderList />} />
              <Route path="allorders/:orderID" element={<SingleOrderDetails />} />
              <Route path="allmenu" element={<MenuEdit />} />
              <Route path="alltable" element={<TableTrackingEdit />} />
              <Route path="edittable" element={<TableInfoEdit />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />

          </Routes>


        </CartProvider>

      </AuthProvider>



    </div>
  );
}

export default App;
