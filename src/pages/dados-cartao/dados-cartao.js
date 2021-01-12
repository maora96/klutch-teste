import React, { useContext } from "react";
import Header from "../../componentes/header/header";
import Logo from "../../componentes/logo/logo";
import { useHistory } from "react-router-dom";
import DataContext from "../../componentes/data/data";
import "./dados-cartao.css";

export default function Dados() {
  const [card, setCard] = React.useState("");
  const [date, setDate] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const history = useHistory();

  const data = useContext(DataContext);

  return (
    <div className="Dados">
      <Header />
      <Logo />
      <form
        onSubmit={(event) => {
          event.preventDefault();
          data.cardNumber = card;
          data.cvc = cvc;
          data.date = date;
          history.push("/modalidades");
        }}
      >
        <div className="dados-content">
          <div className="box">
            <span>Insira os dados do Cartão:</span>
            <input type="text" placeholder="Nome..."></input>
            <input
              type="number"
              placeholder="Número do Cartão..."
              onChange={(event) => {
                setCard(event.target.value);
              }}
            ></input>
            <input
              type="text"
              placeholder="Data de Validade"
              onChange={(event) => {
                setDate(event.target.value);
              }}
            ></input>
            <input
              type="number"
              placeholder="CVC"
              onChange={(event) => {
                setCvc(event.target.value);
              }}
            ></input>
          </div>
          <div className="box">
            <span>Faça o upload dos anexos do cartão:</span>
            <input></input>
            <input></input>
            <input></input>
          </div>
        </div>
        <button>Continuar</button>
      </form>
    </div>
  );
}
