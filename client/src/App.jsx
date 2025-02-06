 import { BrowserRouter, Routes , Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import Footer from './components/Footer'
import PrivateRoute from "./pages/PrivateRoute";
import CreateProduct from "./pages/CreateProduct";
import ShowProduct from "./pages/ShowProduct";
import Dashboard from "./pages/Dashboard";
import Bag from "./pages/Bag";
import ProductFiltering from "./pages/ProductFiltering";
import Checkout from "./pages/Checkout";
import OrderStatus from "./components/OrderStatus";
import ShowOrder from "./pages/ShowOrder";
import FilterProducts from "./pages/FilterProducts";
import TempFilterProd from "./pages/tempFilterProd";
import EditProduct from "./pages/EditProduct";
import ScrollToTop from "./components/ScrollToTop";
import MyOrders from "./pages/MyOrders";          
import MyProfile from "./pages/MyProfile";

function App() {

  return (
    <>
     
      <BrowserRouter>
      <ScrollToTop/>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/showproduct/:productId" element={<ShowProduct />} />
          <Route path="/productfiltering/:arg" element={<ProductFiltering />} />
          <Route path={"/filterproducts"} element={<FilterProducts />} />
          <Route path={"/tempfilterprod"} element={<TempFilterProd />} />
          <Route path="/bag" element={<Bag />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orderstatus/:id" element={<OrderStatus />} />
          <Route path="/showorder/:id" element={<ShowOrder />} />
          <Route path="/editproduct/:id" element={<EditProduct />} />
          <Route path="/myorders/:customerName" element={<MyOrders />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route element={<PrivateRoute />}>
            <Route path="/createproduct" element={<CreateProduct />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App
