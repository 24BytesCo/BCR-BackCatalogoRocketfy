const express = require("express");
require("dotenv").config();
const { bdConnection } = require("./database/config");
const cors = require("cors");

const app = express();

//Configurando cors
app.use(cors());

//Base de datos
bdConnection();

//Rutas
app.get("/", (req, res) => {
  return res.json({
    ok: true,
    mensaje: "Todo Ok",
  });
});

app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto ", process.env.PORT);
});
