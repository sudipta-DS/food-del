import { assets } from "../../assets/assets";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, dicta
            tempore? Dolorum delectus iste placeat totam nam quam officiis in
            odio. Dolores, reprehenderit fugiat cumque maxime quidem, aperiam
            incidunt, praesentium deleniti reiciendis eligendi asperiores. Fugit
            dolorum iusto maxime? Voluptatum, quae exercitationem voluptatem ad
            nam fugit harum maiores expedita ullam accusantium?
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-9330210771</li>
            <li>contact@tomato.in</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="footer-copy-right">
        Copyright 2024 ©️ Tomato.com - All rights Reserved.
      </div>
    </div>
  );
};

export default Footer;
