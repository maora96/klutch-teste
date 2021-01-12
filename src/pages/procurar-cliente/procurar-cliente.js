import React, { useContext } from "react";
import Header from "../../componentes/header/header";
import Logo from "../../componentes/logo/logo";
import { useHistory } from "react-router-dom";
import DataContext from "../../componentes/data/data";
import "./procurar-cliente.css";

export default function ProcurarCliente() {
  const [client, setClient] = React.useState(null);
  const [input, setInput] = React.useState("");
  const history = useHistory();

  const data = useContext(DataContext);
  return (
    <div className="ProcurarCliente">
      <Header />
      <Logo />
      <h2>Busque o Cliente</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          fetch("http://localhost:3000/client")
            .then((res) => res.json())
            .then((result) => {
              const c = result.filter((x) => {
                return x.cpf === input;
              });
              console.log(c);
              setClient(c[0]);
              console.log(client);
            });
        }}
      >
        <input
          type="text"
          placeholder="..."
          onChange={(event) => {
            setInput(event.target.value);
          }}
        ></input>
        <button>Buscar</button>
      </form>

      {client === null ? (
        ""
      ) : (
        <div className="cliente">
          <div className="cliente-data">
            <h3>Cliente encontrado:</h3>
            <span className="cpf">{client.cpf}</span>
            <span className="name">{client.name}</span>
            <button
              onClick={() => {
                data.clientId = client.id;
                console.log(data);
                history.push("/dados");
              }}
            >
              Solicitar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
