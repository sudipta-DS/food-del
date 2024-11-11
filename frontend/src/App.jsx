import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import Verify from "./components/Verify/Verify";
import { useState } from "react";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import MyOrders from "./pages/MyOrders/MyOrders";
const App = () => {
  const [logInPopup, setLogInPopup] = useState(false);
  return (
    <>
      {logInPopup ? <LoginPopup setLogInPopup={setLogInPopup} /> : <></>}
      <div className="app">
        <Navbar setLogInPopup={setLogInPopup} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default App;
