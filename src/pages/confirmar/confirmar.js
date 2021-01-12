import React, { useContext } from "react";
import Header from "../../componentes/header/header";
import Logo from "../../componentes/logo/logo";
import { useHistory } from "react-router-dom";
import DataContext from "../../componentes/data/data";
import "./confirmar.css";

export default function Confirmar() {
  const [contrato, setContrato] = React.useState("Manual");
  const [manual, setManual] = React.useState("active");
  const [automatico, setAutomatico] = React.useState("");
  const history = useHistory();
  const data = useContext(DataContext);

  return (
    <div className="Confirmar">
      <Header />
      <div className="top">
        <div className="top-container">
          <Logo />
          <div className="label">
            <span>Tabela</span>
            <span className="value">{data.tabela.name}</span>
          </div>
        </div>
      </div>

      <div className="emprestimo-data">
        <div className="left">
          <div className="subbox">
            <span>Valor Desejado</span>
            <span className="value">{data.desiredValue}</span>
          </div>
          <div className="subbox">
            <span>Parcelas</span>
            <span className="value">{data.installments}</span>
          </div>
        </div>
        <div className="left">
          <div className="subbox">
            <span>Valor Total do Emprestimo</span>
            <span className="value">{data.totalLoan}</span>
          </div>
          <div className="subbox">
            <span>Valor da Parcela</span>
            <span className="value">{data.installmentValue}</span>
          </div>
        </div>
      </div>

      <div className="buttons">
        <div className="btn-container">
          <span>Escolha o tipo de contrato:</span>
          <div className="buttons-flex">
            <div className="minor">
              <div
                className={`contrato-buttons ${automatico}`}
                onClick={() => {
                  setContrato("Automático");
                  setManual("");
                  setAutomatico("active");
                }}
              >
                Automático
              </div>
              <div
                className={`contrato-buttons ${manual}`}
                onClick={() => {
                  setContrato("Manual");
                  setManual("active");
                  setAutomatico("");
                }}
              >
                Manual
              </div>
            </div>
            <button
              className="concluir"
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

                data.contrato = contrato;
                history.push("/revisao");
              }}
            >
              Concluir
            </button>
          </div>
        </div>
      </div>
      <div className="tabela">
        <table>
          <thead>
            <tr>
              <th colspan="52" className="table-title">
                {data.tabela.name}
              </th>
            </tr>
            <tr>
              <th className="no-header">Parcela</th>
              <th className="no-header">Juros da Parcela</th>
              <th className="no-header">Valor Parcela</th>
              <th className="no-header">Valor Total</th>
              <th className="no-header">Comissão Parceiro</th>
            </tr>
          </thead>
          <tbody>
            {data.tabela.installments.map((i) => {
              return (
                <tr>
                  <td>{i.installments}</td>
                  <td>{i.installmentInterest} %</td>
                  <td>R$ {data.desiredValue / i.installments}</td>
                  <td>R$ {data.desiredValue}</td>
                  <td>R$ {i.comission}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
