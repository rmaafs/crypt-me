import Database from "./Database";

const express = require("express");
const cors = require("cors");

export default function Server() {
  const app = express().use(cors()).use(express.json()); //Crea al servidor
  const port = process.env.PORT || 20203; //Puerto donde abriremos el servicio

  //Ruta GET / para saber si el servicio está corriendo
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Works!" });
  });

  //Ruta POST /wa-bot para mandar los mensajes
  app.post("/", async (req, res) => {
    new Database();
    res.status(200).json({ message: "Works!" });
  });

  //Abrimos el servicio de API REST
  const server = app.listen(port, () => {
    console.log(`API REST Ejecutado en el puerto http://localhost:${port}`);
  });

  return server;
}
