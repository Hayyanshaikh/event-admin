import React from "react";
import * as Icons from "react-icons/tb";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
  return (
    <nav className="breadcrumb_main">
      <ol className="breadcrumb">
        <li className="breadcrumb_item">
          <Link to="/">
            <Icons.TbSmartHome />
          </Link>
          <Icons.TbChevronRight className="breadcrumb_icon" />
        </li>
        {items.map((item, index) => (
          <li
            className={`breadcrumb_item ${
              index === items.length - 1 ? "active" : ""
            }`}
            key={index}
          >
            {index !== items.length - 1 ? (
              <>
                <Link to={item.url}>{item.label}</Link>
                <Icons.TbChevronRight className="breadcrumb_icon" />
              </>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
