import { createContext, useEffect, useState } from "react";
import axios from "axios";

const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(null);
  const [foodList, setFoodList] = useState([]);
  // const [location, setLocation] = useState(null);
  const url = "https://food-del-backend-ujaf.onrender.com";
  const RAZORPAY_KEY_ID = "rzp_test_8HM6TN5GrALT7Z";
  // const API_KEY = "AIzaSyB-kNa4RgdvkA_5tFb7F-rTeO0JdiqjPA4";
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: cartItems[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        `${url}/api/cart/add`,
        { itemId },
        { headers: { token } }
      );
    }
  };
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: cartItems[itemId] - 1 }));
    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    // console.log(cartItems);
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        console.log(itemInfo);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const loadCartData = async (token) => {
    const res = await axios.get(`${url}/api/cart/list`, {
      headers: { token },
    });
    console.log(res.data.data);
    setCartItems(res.data.data);
  };

  const fetchFoodList = async () => {
    const res = await axios.get(`${url}/api/food/list`, {
      location: location,
    });
    console.log(res.data.data);
    setFoodList(res.data.data);
  };
  // function reverseGeocode(latitude, longitude) {
  // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`;

  // fetch(url)
  //   .then((response) => response.json())
  //   .then((data) => {
  //     if (data.status === "OK") {
  //       const address = data.results[0].formatted_address.split(",");
  //       setLocation(address[address.length - 3]);
  //     } else {
  //       console.log("Geocoding error:", data.status);
  //     }
  //   })
  //   .catch((error) => {
  //     console.log("Request failed:", error);
  //   });
  // }

  useEffect(() => {
    // function geoLocation() {
    //   if ("geolocation" in navigator) {
    //     navigator.geolocation.getCurrentPosition(
    //       (res) => {
    //         console.log(res.coords.latitude);
    //         console.log(res.coords.longitude);

    //         reverseGeocode(res.coords.latitude, res.coords.longitude);
    //       },
    //       (error) => {
    //         console.log(error);
    //       }
    //     );
    //   }
    // }
    async function loadData() {
      // geoLocation();
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    RAZORPAY_KEY_ID,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreContextProvider };
