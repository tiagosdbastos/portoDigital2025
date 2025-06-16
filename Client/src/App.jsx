import React from "react";
import Counter from "./components/Counter";
import PieChartEvents from "./components/PieChartEvents";
import MapEvents from "./components/MapEvents";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">Dashboard de Monitoramento de Eventos Tech</h1>

      <div className="flex-row">
        <div className="card">
          <h2 className="card-title">Índice de Contagem de eventos</h2>
          <Counter />
        </div>
        <div className="card">
          <h2 className="card-title">Distribuição por Modalidade</h2>
          <PieChartEvents />
        </div>
        <div className="card">
          <h2 className="card-title">Localização dos Eventos</h2>
          <MapEvents />
        </div>
      </div>
    </div>
  );
}

export default App;
