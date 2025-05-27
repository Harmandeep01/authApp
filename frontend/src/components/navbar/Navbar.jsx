import "./Navbar.css";
import avatar from "../../assets/avatar.png";
import SignUp from "../SignUp/SignUp";
import { useState } from "react";
const Navbar = () => {
  const [togglePage, setTogglePage] = useState(false);
  return (
    <div>
      <div className="navbar">
        <div className="nav-links">
          <ul>
            <img src={avatar} alt="avatar" />
            <li onClick={() => setTogglePage(null)} style={{ cursor: 'pointer' }}>
            Home
          </li>
            <li>Web Designs</li>
            <li>Mobile Designs</li>
            <li>Illustrations</li>
          </ul>
        </div>
        <div className="search-items">
          <input className="search-bar" type="text" placeholder="Search" />
          <button
          className={togglePage ? "button-active" : "button"}
            type="button"
            onClick={() => setTogglePage(true)}
            disabled={togglePage}
          >
            Sign In
          </button>
          <button
          className={togglePage ? "button" : "button-active"}  
            type="button"
            onClick={() => setTogglePage(false)}
            disabled={!togglePage}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
