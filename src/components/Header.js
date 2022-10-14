import React from "react";

import LogOut from "./logOutButton";

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <h2 className="item">Jobs List</h2>
      <div className="right menu">
        <div className="item">
          <LogOut />
        </div>
      </div>
    </div>
  );
};

export default Header;
