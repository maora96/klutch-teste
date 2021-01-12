import React from "react";
import "./header.css";
import KlutchLogo from "../../images/Grupo290.svg";

export default function Header() {
  return (
    <div>
      <header>
        <div className="hamburguer-menu"></div>
        <div className="logo">
          <img src={KlutchLogo} />
        </div>
      </header>
    </div>
  );
}
