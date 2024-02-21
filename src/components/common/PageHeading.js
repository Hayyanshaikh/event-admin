import React from "react";

const PageHeading = ({ children }) => {
  return (
    <div className="page_header">
      <div className="container">
        <div className="page_header_wrapper">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageHeading;
