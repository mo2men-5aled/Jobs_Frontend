import React from "react";
import { Link } from "react-router-dom";

import LogOut from "./logOutButton";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <Link to="/" className="item">
        Main List
      </Link>
      <div className="right menu">
        <LogOut />
      </div>
    </div>
  );
};

export default Header;
