import { useContext, useEffect } from "react";
import { StoreContext } from "../../Contexts/StoreContext";
import "./Verify.css";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
const Verify = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const data = location.state;
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url, RAZORPAY_KEY_ID, setCartItems, token } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    // const res = await axios.post(`${url}/api/order/verify`, {
    //   success,
    //   orderId,
    // });
    // if (res.data.success) {
    //   navigate("/myorders");
    // } else {
    //   navigate("/");
    // }
    const options = {
      key: RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "Sudipta Samanta",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        console.log("response", response);
        try {
          const res = await fetch(`${url}/api/order/verify`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
              token: token,
            },
            body: JSON.stringify({
              // razorpay_order_id: response.razorpay_order_id,
              // razorpay_payment_id: response.razorpay_payment_id,
              // razorpay_signature: response.razorpay_signature,
              orderId: orderId,
              success: success,
            }),
          });

          const verifyData = await res.json();

          if (verifyData.message) {
            // toast.success(verifyData.message);
            setCartItems({});
            navigate("/myorders");
          }
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    verifyPayment();
  });
  return (
    <div className="verify">
      <div className="spinner"></div>
    </div>
  );
};

export default Verify;
