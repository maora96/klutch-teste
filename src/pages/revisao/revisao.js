import React, { useContext } from "react";
import Header from "../../componentes/header/header";
import { useHistory } from "react-router-dom";
import DataContext from "../../componentes/data/data";

export default function Revisao() {
  const history = useHistory();
  const data = useContext(DataContext);

  return (
    <div>
      <Header />
      <h2>Solicitação realizada com sucesso!</h2>
      Resumo da Solicitação
      <div className="revisao-content">
        <span>Cliente | Tel</span>
        <span>
          Card | {data.cardNumber.slice(-4)} | Visa | {data.date}
        </span>
        <span>Valor desejado | {data.desiredValue}</span>
        <span>Taxa de Juros | {data.installmentInterest} %</span>
        <span>Parcelas | {data.installments}</span>
        <span>Valor da parcela | {data.installmentValue}</span>
        <span>Valor total do emprestimo | {data.totalLoan}</span>
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
        O CredFica avaliará a solicitação
      </div>
    </div>
  );
}
