import React, { useEffect, useState } from "react";
import db from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function buscarEventos() {
      const querySnapshot = await getDocs(collection(db, "eventos"));
      setCount(querySnapshot.size);
    }
    buscarEventos();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // centraliza verticalmente
        alignItems: "center",     // centraliza horizontalmente
        height: "200px",          // altura para o número ficar bem no centro
      }}
    >
      <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
        Índice 1: Eventos de Inovação & Tecnologia
      </h2>
      <p
        style={{
          fontSize: "6rem",
          fontWeight: "bold",
          color: "#0088FE",
          margin: 0,
        }}
      >
        {count}
      </p>
    </div>
  );
};

export default Counter;
