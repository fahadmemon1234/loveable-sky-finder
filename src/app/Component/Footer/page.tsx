import React from "react";

const Footer = () => {
  return (
    <div className="dashboard-footer">
      <div className="flex-between flex-wrap gap-16">
        <p className="text-gray-300 text-13 fw-normal">
          {" "}
          © Copyright <b>School Management System {new Date().getFullYear()}</b>, All
          Right Reserverd
        </p>
      </div>
    </div>
  );
};

export default Footer;
