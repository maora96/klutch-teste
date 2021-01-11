import React, { useContext } from "react";
import Header from "../../componentes/header/header";
import { useHistory } from "react-router-dom";
import DataContext from "../../componentes/data/data";

export default function Home() {
  const [valor, setValor] = React.useState(0);
  const [tabelas, setTabelas] = React.useState([]);
  const [tabelaEscolhida, setTabelaEscolhida] = React.useState(null);
  const [parcela, setParcela] = React.useState([]);
  const history = useHistory();

  const data = useContext(DataContext);
  return (
    <div>
      <Header />
      <h1>Valor Desejado</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetch("http://localhost:3000/rateTable")
            .then((res) => res.json())
            .then((result) => {
              console.log(result);
              console.log(valor);
              setTabelas(result);
            });
        }}
      >
        <input
          type="text"
          placeholder="R$0,00"
          onChange={(event) => {
            setValor(event.target.value);
          }}
        ></input>
        <button>Calcular</button>
      </form>
      <div className="tabelas">
        {tabelas === [] ? (
          <div></div>
        ) : (
          tabelas.map((tabela) => {
            return (
              <div>
                <h3>{tabela.name}</h3>
                {tabela.installments.map((i) => {
                  return (
                    <li
                      onClick={() => {
                        setTabelaEscolhida(tabela);
                        setParcela(i);
                        console.log(tabela);
                        console.log(i);
                      }}
                    >
                      {i.installments} | {i.installmentInterest} |
                      {valor / i.installments} | {valor} | {i.comission}
                    </li>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
      <footer>
        Nome: {tabelaEscolhida === null ? "" : tabelaEscolhida.name} | Parcelas:
        {parcela === null ? "" : parcela.installments}| Valor da Parcela:
        {parcela === null ? "" : parseInt(valor) / parcela.installments}
        <button
          onClick={() => {
            data.installments = parcela.installments;
            data.installmentInterest = parcela.installmentInterest;
            data.installmentInterestValue = null;
            data.installmentId = parcela.id;
            data.installmentValue = valor / parcela.installments;
            data.comission = parcela.comission;
            data.comissionValue = null;
            data.installmentId = parcela.id;
            data.rateTableId = tabelaEscolhida.id;
            data.desiredValue = parseInt(valor);
            data.totalLoan =
              "desiredValue + comissionValue + installmentInterestValue";
            data.tabela = tabelaEscolhida;

            localStorage.setItem(
              "solicitation",
              JSON.stringify({
                installments: parcela.installments,
                installmentInterest: parcela.installmentInterest,
                installmentInterestValue: null,
                installmentValue: valor / parcela.installments,
                comission: parcela.comission,
                comissionValue: null,
                installmentId: parcela.id,
                rateTableId: tabelaEscolhida.id,
                desiredValue: parseInt(valor),
                cardNumber: null,
                totalLoan:
                  "desiredValue + comissionValue + installmentInterestValue",
                clientId: null,
              })
            );
            console.log(data);
            history.push("/procurar-cliente");
          }}
        >
          Confirmar
        </button>
      </footer>
    </div>
  );
}
