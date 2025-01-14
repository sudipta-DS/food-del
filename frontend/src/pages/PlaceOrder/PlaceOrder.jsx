import { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Contexts/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, foodList, cartItems, url, token } =
    useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    foodList.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });
    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };
    let res = await axios.post(`${url}/api/order/place`, orderData, {
      headers: { token },
    });
    console.log(token);
    if (res.data.success) {
      const { session_url, data } = res.data;

      // const options = {
      //   key: RAZORPAY_KEY_ID,
      //   amount: data.amount,
      //   currency: data.currency,
      //   name: "Sudipta Samanta",
      //   description: "Test Mode",
      //   order_id: data.id,
      //   handler: async (response) => {
      //     console.log("response", response);
      //     try {
      //       const res = await fetch(`${url}/api/order/verify`, {
      //         method: "POST",
      //         headers: {
      //           "content-type": "application/json",
      //           token: token,
      //         },
      //         body: JSON.stringify({
      //           // razorpay_order_id: response.razorpay_order_id,
      //           // razorpay_payment_id: response.razorpay_payment_id,
      //           // razorpay_signature: response.razorpay_signature,
      //           // orderId: orderId,
      //           // success: success,
      //         }),
      //       });

      //       const verifyData = await res.json();

      //       if (verifyData.message) {
      //         // toast.success(verifyData.message);
      //         setCartItems({});
      //         navigate("/myorders");
      //       }
      //     } catch (error) {
      //       console.log(error);
      //     }
      //   },
      //   theme: {
      //     color: "#5f63b8",
      //   },
      // };
      // const rzp1 = new window.Razorpay(options);

      // rzp1.open();

      // window.location.replace(session_url);
      navigate(session_url, { state: data });
    } else {
      console.log(res);
      alert("error");
    }
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  });

  return (
    <form onSubmit={(e) => placeOrder(e)} action="" className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            value={data.firstName}
            onChange={(e) => onChangeHandler(e)}
            name="firstName"
            type="text"
            placeholder="First name"
          />
          <input
            required
            value={data.lastName}
            onChange={(e) => onChangeHandler(e)}
            name="lastName"
            type="text"
            placeholder="Last name"
          />
        </div>
        <input
          required
          value={data.email}
          onChange={(e) => onChangeHandler(e)}
          name="email"
          type="email"
          placeholder="Email address"
        />
        <input
          required
          value={data.street}
          onChange={(e) => onChangeHandler(e)}
          name="street"
          type="text"
          placeholder="street"
        />
        <div className="multi-fields">
          <input
            required
            value={data.city}
            onChange={(e) => onChangeHandler(e)}
            name="city"
            type="text"
            placeholder="City"
          />
          <input
            required
            value={data.state}
            onChange={(e) => onChangeHandler(e)}
            name="state"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            value={data.zipcode}
            onChange={(e) => onChangeHandler(e)}
            name="zipcode"
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            value={data.country}
            onChange={(e) => onChangeHandler(e)}
            name="country"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          value={data.phone}
          onChange={(e) => onChangeHandler(e)}
          name="phone"
          type="text"
          placeholder="Phone"
        />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount() + 2}</b>
            </div>
            <hr />
          </div>
          <button type="submit">PROCEED TO CHECKOUT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
