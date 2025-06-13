import React from "react";
import Counter from "./components/Counter";
import PieChartEvents from "./components/PieChartEvents";
import MapEvents from "./components/MapEvents";

function App() {
  return (
    <div style={{ maxWidth: 800, margin: "40px auto", textAlign: "center" }}>
      <h1>Dashboard índices de monitoramento de eventos tech</h1>
      <Counter />
      <PieChartEvents />
      <MapEvents />
    </div>
  );
}

export default App;
