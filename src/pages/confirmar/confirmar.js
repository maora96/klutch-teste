import React, { useContext } from "react";
import Header from "../../componentes/header/header";
import { useHistory } from "react-router-dom";
import { fazerRequisicaoComBody } from "../../utils/fetch";
import DataContext from "../../componentes/data/data";

export default function Confirmar() {
  const [contrato, setContrato] = React.useState("");
  const history = useHistory();
  const data = useContext(DataContext);

  return (
    <div>
      <Header />
      <div className="emprestimo-data">
        <div>Logo | {data.tabela.name}</div>
        <li>
          {data.desiredValue} | {data.totalLoan}
        </li>
        <li>
          {data.installments} | {data.installmentValue}
        </li>
        <div className="buttons">
          <button
            onClick={() => {
              setContrato("Automático");
            }}
          >
            Automático
          </button>
          <button
            onClick={() => {
              setContrato("Manual");
            }}
          >
            Manual
          </button>
          <button
            onClick={() => {
              const emprestimo = {
                clientId: data.clientId,
                installmentInterest: data.installmentInterest,
                installmentInterestValue: data.installmentInterestValue,
                comission: data.comission,
                comissionValue: data.comissionValue,
                installmentValue: data.installmentValue,
                cardNumber: data.cardNumber,
                desiredValue: data.desiredValue,
                totalLoan: data.totalLoan,
                installmentId: data.installmentId,
                rateTableId: data.rateTableId,
              };
              console.log(contrato);
              localStorage.setItem("contrato", contrato);
              fazerRequisicaoComBody(
                "http://localhost:3000/solicitation",
                "POST",
                emprestimo
              );
              data.contrato = contrato;
              history.push("/revisao");
            }}
          >
            Concluir
          </button>
        </div>
      </div>

      <div>
        <h3>{data.tabela.name}</h3>
        {data.tabela.installments.map((i) => {
          return (
            <li>
              {i.installments} | {i.installmentInterest} |
              {data.desiredValue / i.installments} |{data.desiredValue} |
              {i.comission}
            </li>
          );
        })}
      </div>
    </div>
  );
}
