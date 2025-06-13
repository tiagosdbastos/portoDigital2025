import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { collection, getDocs } from "firebase/firestore";
import db from "../services/firebase";

const COLORS = ["#0088FE", "#00C49F"]; // cores para Online e Presencial

const PieChartEvents = () => {
  const [data, setData] = useState([
    { name: "Online", value: 0 },
    { name: "Presencial", value: 0 },
  ]);

  useEffect(() => {
    async function BuscarEventoss() {
      try {
        const querySnapshot = await getDocs(collection(db, "eventos"));
        let onlineCount = 0;
        let presencialCount = 0;

        querySnapshot.forEach((doc) => {
          //percorre cada doc
          const event = doc.data(); //eent aqui vai ser o coteudo de cada evento
          if (
            event.location &&
            event.location.toLowerCase().includes("streaming")
          ) {
            //se o evento tem localizacao no corp E possui streaming como conteudo
            onlineCount++; //aumenta o count do online
          } else {
            //senao aumenta presencial
            presencialCount++;
          }
        });

        setData([
          //atualiza o state com os novos valores
          { name: "Online", value: onlineCount },
          { name: "Presencial", value: presencialCount },
        ]);
      } catch (error) {
        console.error("Erro ao buscar eventos para gráfico:", error);
      }
    }

    BuscarEventoss(); //executa a funcao
  }, []);

  return (
    <div style={{ width: "100%", height: 300, marginTop: 40 }}>
      <h2 style={{ textAlign: "center" }}>
        Índice 2: Distribuição Online vs. Presencial
      </h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartEvents;
