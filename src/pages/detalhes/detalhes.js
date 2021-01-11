import React, { useContext } from "react";
import Header from "../../componentes/header/header";
import { useHistory, useRouteMatch } from "react-router-dom";
import DataContext from "../../componentes/data/data";

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
    fetch(`http://localhost:3000/client/${emprestimo.clientId}`)
      .then((x) => x.json())
      .then((xJson) => {
        console.log(xJson);
        setClient(xJson);
      });
  }, [emprestimo]);

  return (
    <div>
      <Header />
      <div className="detalhe-content">
        <div className="box">
          <div className="one">
            <span>Solicitação gerada por Sistema CredFica</span>
          </div>
          <div className="two">
            <div>
              Valor total
              <span>R$ {emprestimo.desiredValue}</span>
            </div>

            <div>
              Valor a depositar
              <span>R$ {emprestimo.totalLoan}</span>
            </div>
          </div>

          <div>
            Frente do Cartão
            <img src=" " />
            Ver comprovante
          </div>
          <div>
            Verso do Cartão
            <img src=" " />
            Ver comprovante
          </div>
          <div>
            Selfie do Cartão
            <img src=" " />
            Ver comprovante
          </div>
        </div>
        <div className="box">
          <div className="one">
            <div>Fluxo da solicitação: {}</div>
            <div>
              Modalidade Cartão de Crédito
              <span>Número do cartão: {emprestimo.cardNumber}</span>
              <div>
                <span>Validade: {data.date}</span> <span>CVC: {data.cvc}</span>
              </div>
              <span>
                {emprestimo.installments} parcela de R$
                {emprestimo.installmentValue}
              </span>
              <span>Tabela: {}</span>
            </div>
            <div>
              Informações do Cliente:
              <span>Nome:{client.name}</span>
              <span>CPF:{client.cpf}</span>
              <span>Banco:{client.bank.label}</span>
              <span>Tipo de conta:{client.bank.accountTypeLabel}</span>
              <span>Número da conta:{client.bank.accountNumber}</span>
            </div>
            <div>
              Informações gerais:
              <div>
                <div>Aguardando</div>
                <div>Pré-aprovar</div>
                <div>Reprovar</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
