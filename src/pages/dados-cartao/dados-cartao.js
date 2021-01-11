import React, { useContext } from "react";
import Header from "../../componentes/header/header";
import { useHistory } from "react-router-dom";
import DataContext from "../../componentes/data/data";

export default function Dados() {
  const [card, setCard] = React.useState("");
  const [date, setDate] = React.useState("");
  const [cvc, setCvc] = React.useState("");
  const history = useHistory();

  const data = useContext(DataContext);

  return (
    <div>
      <Header />
      <h2>Dados</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          data.cardNumber = card;
          data.cvc = cvc;
          data.date = date;
          history.push("/confirmar");
        }}
      >
        <input type="text"></input>
        <input
          type="number"
          onChange={(event) => {
            setCard(event.target.value);
          }}
        ></input>
        <input
          type="text"
          onChange={(event) => {
            setDate(event.target.value);
          }}
        ></input>
        <input
          type="number"
          onChange={(event) => {
            setCvc(event.target.value);
          }}
        ></input>
        <button>Continuar</button>
      </form>
    </div>
  );
}
