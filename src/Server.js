import Database from "./Database";

const express = require("express");
const cors = require("cors");

/**
 * Función que inicia el API REST
 * @returns Retorna la instancia del servidor express
 */
function Server() {
  let app = express().use(cors()).use(express.json()); //Crea al servidor
  const port = process.env.PORT || 20203; //Puerto donde abriremos el servicio

  app.use((req, res, next) => {
    if (!req) return; //Para que no me aparezca que no usé la variable jaja

    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  const db = new Database(() => {
    /**
     * Función que ejecutará el servidor API REST
     */
    //Eliminamos los registros viejos en la base de datos
    setInterval(function () {
      db.deleteDueRegs();
    }, 15 * 60 * 1000); //Cada 15 minutos

    //Abrimos el servicio de API REST
    const server = app.listen(port, () => {
      console.log(`API REST Ejecutado en el puerto http://localhost:${port}`);
      app.emit("appStarted", server, db);
    });
  });

  //Ruta GET / para saber si el servicio está corriendo
  app.get("/", (req, res) => {
    res.status(200).json({ message: "Works!" });
  });

  //Ruta POST / para mandar los mensajes
  app.post("/", async (req, res) => {
    //Guardamos la IP del que lo envía
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    //Texto a encriptar
    const text = req.body.text || "";

    await db
      .addReg(text, ip)
      .then((data) => {
        if (data.id) {
          res.status(201).json(data);
        } else {
          res
            .status(400)
            .json({ error: "Hubo un error al procesar tu solicitud." });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  });

  //Ruta PATCH / para obtener el texto desencriptado
  app.patch("/", async (req, res) => {
    //Guardamos la IP del que lo envía
    //const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    //ID del texto
    const id = req.body.id || "";
    //Secret para desencriptar
    const secret = req.body.secret || "";

    await db
      .getReg(id, secret)
      .then((data) => {
        if (data.text) {
          res.status(200).json(data);
        } else {
          res
            .status(400)
            .json({ error: "Hubo un error al procesar tu solicitud." });
        }
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  });

  return app;
}

export default Server;
