import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./assets/styles/App.css";
import "./assets/styles/bootstrap.custom.css";
import AdminPrivateRoutes from "./component/AdminPrivateRoute";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import PrivateRoute from "./component/privateRoute";
import OrderScreen from "./screens/OrderScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AdminUserUpdate from "./screens/adminScreens/AdminUserUpdate";
import OrderListScreen from "./screens/adminScreens/OrderListScreen";
import ProductListScreen from "./screens/adminScreens/ProductListScreen";
import UpdateProduct from "./screens/adminScreens/UpdateProduct";
import UserListScreen from "./screens/adminScreens/UserListScreen";
import CartScreen from "./screens/cartScreen";
import HomeScreen from "./screens/homeScreen";
import LogInScreen from "./screens/logInScreen";
import Payment from "./screens/paymentScreen";
import Product from "./screens/product";
import RegisterScreen from "./screens/registerScreen";
import Shipping from "./screens/shippingScreen";
import { useAutoLogInQuery } from "./slices/authSlice";
import { logout } from "./slices/userCredentialSlice";
import { store } from "./store";

const Root = () => {
  const dispatch = useDispatch();
  const { data, error } = useAutoLogInQuery();
  useEffect(() => {
    if (error) {
      console.log(error);
      console.log("unAthorized");
      dispatch(logout());
    }
  }, [data, dispatch, error]);

  // creating the layout
  return (
    <>
      <header>
        <Navbar />
        <ToastContainer />
      </header>
      <main>
        {/* adding all the routes in createRouterFromlements() */}
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    // route is providing the layouts...................
    <Route path="/" element={<Root />}>
      <Route index element={<HomeScreen />} />
      <Route path="/page/:pageNum" element={<HomeScreen />} />
      <Route path="keyword/:keyword/page/:pageNum" element={<HomeScreen />} />
      <Route path="product/:id" element={<Product />} />
      <Route path="cart" element={<CartScreen />} />
      <Route path="signIn" element={<LogInScreen />} />
      <Route path="signup" element={<RegisterScreen />} />

      {/* user private routes............................... */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/orderPlace" element={<OrderScreen />} />
        <Route path="/orders/:id" element={<PlaceOrderScreen />} />
        <Route path="/payment" element={<Payment />} />
      </Route>
      <Route path="" element={<AdminPrivateRoutes />}>
        <Route path="/orderList" element={<OrderListScreen />} />
        <Route path="/product/update/:id" element={<UpdateProduct />} />
        <Route path="/productList" element={<ProductListScreen />} />
        <Route
          path="/productList/page/:pageNum"
          element={<ProductListScreen />}
        />
        <Route
          path="/productList/:keyword/page/:pageNum"
          element={<ProductListScreen />}
        />
        <Route path="/users" element={<UserListScreen />} />
        <Route path="/users/edit/:id" element={<AdminUserUpdate />} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      {/* reducer store */}
      <Provider store={store}>
        {/* adding the router and returning as App */}
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
