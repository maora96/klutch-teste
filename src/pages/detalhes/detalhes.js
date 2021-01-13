import React, { useContext } from "react";
import Header from "../../componentes/header/header";
import { useHistory, useRouteMatch } from "react-router-dom";
import DataContext from "../../componentes/data/data";
import Document from "../../images/document.svg";
import Box from "../../images/filing-2.svg";
import Card from "../../images/card.svg";
import Checkmark from "../../images/checkmark.svg";
import Alert from "../../images/alert.svg";
import "./detalhes.css";

export default function Detalhes() {
  const [emprestimo, setEmprestimo] = React.useState({});
  const [client, setClient] = React.useState({});
  const history = useHistory();
  const data = useContext(DataContext);
  const { params } = useRouteMatch();

  React.useEffect(() => {
    fetch(`http://localhost:3000/solicitation/${params.id}`)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        setEmprestimo(resJson);
      });
    console.log(data);
  }, []);

  React.useEffect(() => {
    fetch(`http://localhost:3000/client/${data.clientId}`)
      .then((x) => x.json())
      .then((xJson) => {
        console.log(xJson);
        setClient(xJson);
      });
  }, []);

  return (
    <div className="Detalhes">
      <Header />
      <div className="taxas-logo">
        <img src={Box} className="box" />
        <h1>Simulação de Taxas</h1>
      </div>
      <div className="detalhe-content">
        <div className="detalhe-container">
          <div className="column">
            <div className="one-single">
              Solicitação gerada por <span>Sistema CredFica</span>
            </div>
            <div className="card-holder">
              <div className="card">
                <span>Valor Total</span>
                <span className="valor">R${emprestimo.desiredValue} </span>
              </div>

              <div className="card">
                <span>Valor a depositar</span>
                <span className="valor">R${emprestimo.totalLoan} </span>
              </div>
            </div>

            <div className="card-holder">
              <div className="card">
                <span>Frente do cartão</span>
                <img src={Document} />
                <span>Ver Comprovante</span>
              </div>

              <div className="card">
                <span>Verso do cartão</span>
                <img src={Document} />
                <span>Ver Comprovante</span>
              </div>
            </div>

            <div className="card-holder">
              <div className="card">
                <span>Selfie com cartão</span>
                <img src={Document} />
                <span>Ver Comprovante</span>
              </div>
            </div>
          </div>

          <div className="column">
            <div className="one-single">
              Fluxo de Solicitação: <span>Manual</span>
            </div>
            <div className="one">
              Modalidade:
              <div className="one-box">
                <div className="flex">
                  Cartão de Crédito <img src={Card} />
                </div>

                <div>Número do cartão: {emprestimo.cardNumber}</div>
                <div>
                  <span>Validade: {data.date}</span>{" "}
                  <span>CVC: {data.cvc}</span>
                </div>
                <div>
                  {data.installments} parcelas de:
                  <span clasName="valor">R${emprestimo.installmentValue}</span>
                </div>
                <div>Tabela: {data.tabela.name}</div>
              </div>
            </div>

            <div className="one">
              Informações do Cliente
              <div className="one-box-left">
                <div>Nome: {client.name}</div>
                <div>CPF: {client.cpf}</div>
                <div>Agência: 1231</div>
                <div>Banco:{client.bank.label}</div>
                <div>Tipo de Conta:{client.bank.accountTypeLabel}</div>
                <div>Número da Conta: {client.bank.accountNumber}</div>
              </div>
            </div>

            <div className="one-special">
              Informações Gerais:
              <div className="center">
                <div>Data: 09/03/2020</div>
                <div class="status orange">
                  <img src={Alert} />
                  Aguardando
                </div>
                <div class="status green">
                  <img src={Checkmark} />
                  Pré Aprovar
                </div>
                <div class="status red">
                  <img src={Alert} />
                  Reprovar
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
