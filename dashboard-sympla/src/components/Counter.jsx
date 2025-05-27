import React, { useEffect, useState } from "react";
import db from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import "./Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function fetchCount() {
      const querySnapshot = await getDocs(collection(db, "eventos"));
      setCount(querySnapshot.size);
    }
    fetchCount();
  }, []);

  return (
    <div className="counter-container">
      <h2>Índice 1: Eventos de Inovação & Tecnologia</h2>
      <p className="counter-number">{count}</p>
    </div>
  );
};

export default Counter;
