import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import * as Icons from "react-icons/tb";
import Logo from "../../images/common/logo.svg";
import { menu } from "../../api/api.js";
const Sidebar = () => {
  const [toggle, settoggle] = useState(false);
  const [toggleSub, setToggleSub] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  // menu animation
  const handleManu = (e) => {
    settoggle(e);
    setToggleSub(false);
  };
  const handleSubManu = (e) => {
    setToggleSub(e);
  };
  const handleSidebar = () => {
    setSidebar(!sidebar);
  };
  return (
    <div className={`sidebar ${sidebar ? "active" : ""}`}>
      {/* Admin User */}
      <div className="sidebar_profile">
        <Link to="/" className="logo">
          <img src={Logo} alt="logo" />
        </Link>

        <Link className="navbar_icon menu_sidebar" onClick={handleSidebar}>
          <Icons.TbChevronsLeft className={`${sidebar ? "active" : ""}`} />
        </Link>
      </div>
      {/* menu links */}
      <ul className="menu_main">
        {menu.map(function (menu, key) {
          return (
            <li key={key}>
              {!menu.subMenu ? (
                <NavLink
                  to={`${menu.url}`}
                  className={`menu_link ${toggle === key ? "active" : ""}`}
                  onClick={() => handleManu(key)}
                >
                  {menu.icon}
                  <span>{menu.name}</span>
                  {menu.subMenu ? <Icons.TbChevronDown /> : ""}
                </NavLink>
              ) : (
                <div className="menu_link" onClick={() => handleManu(key)}>
                  {menu.icon}
                  <span>{menu.name}</span>
                  {menu.subMenu ? <Icons.TbChevronDown /> : ""}
                </div>
              )}
              {menu.subMenu ? (
                <ul className={`sub_menu ${toggle === key ? "active" : ""}`}>
                  {menu.subMenu &&
                    menu.subMenu.map(function (subMenu, subKey) {
                      return (
                        <li key={subKey}>
                          {!subMenu.subMenu ? (
                            <NavLink
                              to={`${menu.url}${subMenu.url}`}
                              className="menu_link"
                              onClick={() => handleSubManu(key)}
                            >
                              {subMenu.icon}
                              <span>{subMenu.name}</span>
                              {subMenu.subMenu ? <Icons.TbChevronDown /> : ""}
                            </NavLink>
                          ) : (
                            <div className="menu_link" onClick={() => handleSubManu(subKey)}>
                              {subMenu.icon}
                              <span>{subMenu.name}</span>
                              {subMenu.subMenu ? <Icons.TbChevronDown /> : ""}
                            </div>
                          )}
                          {
                            subMenu.subMenu ? (
                              <ul className={`sub_menu ${toggleSub === subKey ? "active" : ""}`}>
                                {subMenu.subMenu &&
                                  subMenu.subMenu.map(function (
                                    subSubMenu,
                                    subSubKey
                                  ) {
                                    return (
                                      <li key={subSubKey}>
                                        <NavLink
                                          to={`${menu.url}${subMenu.url}${subSubMenu.url}`}
                                          className="menu_link"
                                        >
                                          <span>{subSubMenu.name}</span>
                                        </NavLink>
                                      </li>
                                    );
                                  })}
                              </ul>
                            ) : ""
                          }
                        </li>
                      );
                    })}
                </ul>
              ) : (
                ""
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
