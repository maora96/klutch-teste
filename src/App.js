import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles.css";
import Home from "./pages/home/home";
import ProcurarCliente from "./pages/procurar-cliente/procurar-cliente";
import Confirmar from "./pages/confirmar/confirmar";
import Dados from "./pages/dados-cartao/dados-cartao";
import Detalhes from "./pages/detalhes/detalhes";
import Modalidades from "./pages/modalidades/modalidades";
import Revisao from "./pages/revisao/revisao";
import DataContext from "./componentes/data/data";

const data = {
  installments: null,
  installmentInterest: null,
  installmentInterestValue: null,
  installmentValue: null,
  comission: null,
  comissionValue: null,
  installmentId: null,
  rateTableId: null,
  desiredValue: null,
  cardNumber: null,
  totalLoan: null,
  clientId: null,
  modalidade: null,
  contrato: null,
  tabela: null,
};

export default function App() {
  return (
    <BrowserRouter>
      <DataContext.Provider value={data}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/procurar-cliente" component={ProcurarCliente} />
            <Route path="/confirmar" component={Confirmar} />
            <Route path="/dados" component={Dados} />
            <Route path="/emprestimo/:id" component={Detalhes} />
            <Route path="/modalidades" component={Modalidades} />
            <Route path="/revisao" component={Revisao} />
          </Switch>
        </div>
      </DataContext.Provider>
    </BrowserRouter>
  );
}
