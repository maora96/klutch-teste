import React, { useContext } from "react";
import Header from "../../componentes/header/header";
import Logo from "../../componentes/logo/logo";
import { useHistory } from "react-router-dom";
import DataContext from "../../componentes/data/data";
import "./modalidades.css";

export default function Modalidades() {
  const [modalidade, setModalidade] = React.useState("");
  const history = useHistory();

  const data = useContext(DataContext);

  return (
    <div className="Modalidades">
      <Header />
      <Logo />
      <h2>Escolha a modalidade</h2>
      <div className="modalidades-content">
        <div className="box">
          <button
            onClick={() => {
              setModalidade("Cartão de Crédito");
              console.log(modalidade);
              localStorage.setItem("modalidade", modalidade);
              data.modalidade = "Cartão de Crédito";
              console.log(data);
              history.push("/confirmar");
            }}
          >
            Cartão de Crédito
          </button>
          <span>Ou</span>
          <button disabled={true}>Crédito Consignado</button>
        </div>
      </div>
    </div>
  );
}
