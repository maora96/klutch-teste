import React, { useContext } from "react";
import Header from "../../componentes/header/header";
import { useHistory } from "react-router-dom";
import DataContext from "../../componentes/data/data";
import Logo from "../../componentes/logo/logo";
import Check from "../../images/single-check.svg";
import Card from "../../images/card.svg";
import "./revisao.css";

export default function Revisao() {
  const history = useHistory();
  const data = useContext(DataContext);
  const [nome, setNome] = React.useState("");
  const [tel, setTel] = React.useState("");

  React.useEffect(() => {
    fetch(`http://localhost:3000/client/${data.clientId}`)
      .then((res) => res.json())
      .then((resJson) => {
        setNome(resJson.name);
        setTel(resJson.phone);
      });
  }, []);

  return (
    <div className="Revisao">
      <Header />
      <Logo />
      <h2>Solicitação realizada com sucesso!</h2>

      <div className="revisao-content">
        <span className="span"> Resumo da Solicitação</span>
        <div className="revisao-container">
          <div className="subbox">
            <span>{nome}</span>
            <span>{tel}</span>
            <img src={Check} />
          </div>
          <div className="subbox">
            <span>Taxa de Juros</span>
            <span className="value">{data.installmentInterest} %</span>
            <img src={Check} />
          </div>

          <div className="subbox">
            <img src={Card} />
            <span>{data.cardNumber.slice(-4)}</span>
            <span>VISA</span>
            <span>{data.date}</span>
            <img src={Check} />
          </div>

          <div className="subbox">
            <span>Parcelas</span>
            <span className="value">{data.installments}</span>
            <img src={Check} />
          </div>
          <div className="subbox">
            <span>Valor Desejado</span>
            <span className="value">{data.desiredValue}</span>
            <img src={Check} />
          </div>

          <div className="subbox">
            <span>Valor da parcela</span>
            <span className="value">{data.installmentValue}</span>
            <img src={Check} />
          </div>

          <div className="subbox">
            <span>Valor total do emprestimo</span>
            <span>{data.totalLoan}</span>
            <img src={Check} />
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
                    console.log(data);
                    history.push(`/emprestimo/${size}`);
                  }
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
