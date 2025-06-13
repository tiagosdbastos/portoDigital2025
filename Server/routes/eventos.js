// backend/routes/eventos.js
const express = require("express");
const router = express.Router();
const db = require("../firebase-admin");

router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("eventos").get();
    const eventos = [];

    snapshot.forEach((doc) => {
      eventos.push({ id: doc.id, ...doc.data() });
    });

    res.json(eventos);
  } catch (error) {
    console.error("Erro ao buscar eventos:", error);
    res.status(500).send("Erro ao buscar eventos");
  }
});

module.exports = router;
