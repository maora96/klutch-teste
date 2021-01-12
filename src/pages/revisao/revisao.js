import React, { useContext } from "react";
import Header from "../../componentes/header/header";
import { useHistory } from "react-router-dom";
import DataContext from "../../componentes/data/data";
import Logo from "../../componentes/logo/logo";
import "./revisao.css";

export default function Revisao() {
  const history = useHistory();
  const data = useContext(DataContext);

  return (
    <div className="Revisao">
      <Header />
      <Logo />
      <h2>Solicitação realizada com sucesso!</h2>

      <div className="revisao-content">
        <span className="span"> Resumo da Solicitação</span>
        <div className="revisao-container">
          <div className="subbox">
            <span>Cliente</span>
            <span>Tel</span>
          </div>
          <div className="subbox">
            <span>Taxa de Juros</span>
            <span className="value">{data.installmentInterest} %</span>
          </div>

          <div className="subbox">
            <span>Card</span>
            <span>{data.cardNumber.slice(-4)}</span>
            <span>VISA</span>
            <span>{data.date}</span>
          </div>

          <div className="subbox">
            <span>Parcelas</span>
            <span className="value">{data.installments}</span>
          </div>
          <div className="subbox">
            <span>Valor Desejado</span>
            <span className="value">{data.desiredValue}</span>
          </div>

          <div className="subbox">
            <span>Valor da parcela</span>
            <span className="value">{data.installmentValue}</span>
          </div>

          <div className="subbox">
            <span>Valor total do emprestimo</span>
            <span>{data.totalLoan}</span>
          </div>
        </div>
        <div className="bottom">
          <button
            onClick={() => {
              fetch("http://localhost:3000/solicitation")
                .then((res) => res.json())
                .then((resJson) => {
                  if (resJson !== null) {
                    let size = resJson.length;
                    history.push(`/emprestimo/${size}`);
                  }

                  console.log(resJson.length);
                });
              // history.push(`/emprestimo/${data.id}`)
            }}
          >
            Detalhe da Solicitação
          </button>
          <span>O CredFica avaliará a solicitação</span>
        </div>
      </div>
    </div>
  );
}
