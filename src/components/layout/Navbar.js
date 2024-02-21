import React,{ useContext } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/tb";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar_wrapper">
        <div className="container">
          <div className="navbar_main">
            <div className="navbar_icons">
              <Link className="navbar_icon">
                <Icons.TbLayoutGrid />
              </Link>
              <Link className="navbar_icon">
                <Icons.TbChartLine />
              </Link>
              <Link className="navbar_icon">
                <Icons.TbMessage2 />
              </Link>
              <Link className="navbar_icon">
                <Icons.TbSunHigh />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
