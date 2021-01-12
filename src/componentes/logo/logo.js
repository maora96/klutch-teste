import React from "react";
import Plus from "../../images/Grupo270.svg";
import Box from "../../images/filing-2.svg";
import "./logo.css";

export default function Logo() {
  return (
    <div className="taxas-logo">
      <img src={Plus} className="plus" />
      <img src={Box} className="box" />
      <h1>Simulação de Taxas</h1>
    </div>
  );
}
