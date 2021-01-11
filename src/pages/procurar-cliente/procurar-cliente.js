import React, { useContext } from "react";
import Header from "../../componentes/header/header";
import { useHistory } from "react-router-dom";
import DataContext from "../../componentes/data/data";

export default function ProcurarCliente() {
  const [client, setClient] = React.useState(null);
  const [input, setInput] = React.useState("");
  const history = useHistory();

  const data = useContext(DataContext);
  return (
    <div>
      <Header />
      <h1>Busque o Cliente</h1>
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
          <h3>Cliente encontrado:</h3>
          {client.cpf}
          {client.name}
          <button
            onClick={() => {
              const solicitation = JSON.parse(
                localStorage.getItem("solicitation")
              );
              localStorage.removeItem("solicitation");
              solicitation.clientId = client.id;
              localStorage.setItem(
                "solicitation",
                JSON.stringify(solicitation)
              );
              console.log(solicitation);

              data.clientId = client.id;
              console.log(data);
              history.push("/modalidades");
            }}
          >
            Solicitar
          </button>
        </div>
      )}
    </div>
  );
}
