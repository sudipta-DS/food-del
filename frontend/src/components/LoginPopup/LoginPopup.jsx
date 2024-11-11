import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { useContext, useState } from "react";
import { StoreContext } from "../../Contexts/StoreContext";
import axios from "axios";

const LoginPopup = ({ setLogInPopup }) => {
  const [currState, setCurrState] = useState("Sign Up");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const { url, setToken } = useContext(StoreContext);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (currState === "login") {
      const res = await axios.post(`${url}/api/user/login`, data);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setLogInPopup(false);
      } else {
        alert(res.data.message);
      }
    } else {
      const res = await axios.post(`${url}/api/user/register`, data);
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        setLogInPopup(false);
      } else {
        alert(res.data.message);
      }
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setLogInPopup(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={(e) => onChangeHandler(e)}
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={(e) => onChangeHandler(e)}
            value={data.email}
            type="text"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={(e) => onChangeHandler(e)}
            value={data.password}
            type="text"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create accout" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "login" ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState("login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
