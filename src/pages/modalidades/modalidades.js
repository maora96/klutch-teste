import React, { useContext } from "react";
import Header from "../../componentes/header/header";
import { useHistory } from "react-router-dom";
import DataContext from "../../componentes/data/data";

export default function Modalidades() {
  const [modalidade, setModalidade] = React.useState("");
  const history = useHistory();

  const data = useContext(DataContext);

  return (
    <div>
      <Header />
      <h2>Escolha a modalidade</h2>
      <div>
        <button
          onClick={() => {
            setModalidade("Cartão de Crédito");
            console.log(modalidade);
            localStorage.setItem("modalidade", modalidade);
            data.modalidade = "Cartão de Crédito";
            console.log(data);
            history.push("/dados");
          }}
        >
          Cartão de Crédito
        </button>
        <span>ou</span>
        <button disabled={true}>Crédito Consignado</button>
      </div>
    </div>
  );
}
