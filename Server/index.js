// backend/index.js
const express = require("express");
const cors = require("cors");
const eventosRoutes = require("./routes/eventos");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/eventos", eventosRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
