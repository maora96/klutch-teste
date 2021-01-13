import React, { useContext, useRef } from "react";
import Header from "../../componentes/header/header";
import Logo from "../../componentes/logo/logo";
import "./home.css";
import { useHistory } from "react-router-dom";
import DataContext from "../../componentes/data/data";

export default function Home() {
  const [valor, setValor] = React.useState(0);
  const [tabelas, setTabelas] = React.useState([]);
  const [tabelaEscolhida, setTabelaEscolhida] = React.useState(null);
  const [parcela, setParcela] = React.useState(null);
  const [display, setDisplay] = React.useState("none");
  const [warningDisplay, setWarningDisplay] = React.useState("none");

  const inputRef = useRef();

  const history = useHistory();

  const data = useContext(DataContext);
  return (
    <div className="Home">
      <Header />
      <Logo />
      <h1>Valor Desejado</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (
            inputRef.current.value >= 300 &&
            inputRef.current.value <= 10000
          ) {
            fetch("http://localhost:3000/rateTable")
              .then((res) => res.json())
              .then((result) => {
                console.log(inputRef.current.value);
                setValor(inputRef.current.value);
                setTabelas(result);
              });
            setDisplay("block");
            setWarningDisplay("none");
          } else {
            setTabelas([]);
            setDisplay("none");
            setWarningDisplay("block");
          }
        }}
      >
        <input ref={inputRef} type="text" placeholder="R$0,00"></input>
        <button>Calcular</button>
        <div className={`warning ${warningDisplay}`}>
          O valor deve ser maior que 300 e menor que 10.000
        </div>
      </form>

      <div className="tabelas">
        {tabelas === [] ? (
          <div></div>
        ) : (
          tabelas.map((tabela) => {
            return (
              <div>
                <table>
                  <thead>
                    <tr>
                      <th colspan="52" className="table-title">
                        {tabela.name}
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
                    {tabela.installments.map((i, indice) => {
                      return (
                        <tr
                          onClick={() => {
                            setTabelaEscolhida(tabela);
                            setParcela(tabela.installments[indice]);
                            console.log(tabela);
                            console.log(i);
                          }}
                        >
                          <td>{i.installments}</td>
                          <td>{i.installmentInterest} %</td>
                          <td>R$ {valor / i.installments}</td>
                          <td>R$ {valor}</td>
                          <td>{i.comission} %</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            );
          })
        )}
      </div>
      <div className={`sticky-bar ${display}`}>
        <div className="bar-content">
          <div className="data">
            <span>
              Nome: {tabelaEscolhida === null ? "" : tabelaEscolhida.name}
            </span>
            <span>
              Parcelas: {parcela === null ? "" : parcela.installments}{" "}
            </span>
            <span>
              Valor da Parcela: {parcela === null ? "" : parseInt(valor)}
            </span>
          </div>
          <button
            onClick={() => {
              data.installments = parcela.installments;
              data.installmentInterest = parcela.installmentInterest;
              data.installmentInterestValue =
                ((parcela.installmentInterest / 100) * valor) /
                parseInt(parcela.installments);
              data.installmentId = parcela.id;
              data.installmentValue = valor / parseInt(parcela.installments);
              data.comission = parcela.comission;
              data.comissionValue = (parcela.comission / 100) * valor;
              data.installmentId = parcela.id;
              data.rateTableId = tabelaEscolhida.id;
              data.desiredValue = parseInt(valor);
              data.totalLoan =
                parseInt(valor) +
                data.installmentInterestValue * parcela.installments;
              data.tabela = tabelaEscolhida;

              console.log(data);
              history.push("/procurar-cliente");
            }}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
