// Importamos las bibliotecas necesarias para nuestra aplicación.
const express = require("express"); // Express para crear nuestro servidor web.
require("dotenv").config(); // Dotenv para cargar variables de entorno desde un archivo .env.
const { bdConnection } = require("./database/config"); // Importamos una función personalizada para la conexión a la base de datos.
const cors = require("cors"); // CORS para habilitar el intercambio de recursos entre dominios.

// Creamos una instancia de Express.
const app = express();

// Habilitamos CORS para permitir solicitudes desde diferentes dominios.
app.use(cors());

//Parseo del body
app.use(express.json());


// Conectamos a la base de datos utilizando la función personalizada bdConnection.
bdConnection();

// Configuramos una ruta básica que devuelve una respuesta JSON en la raíz de nuestro servidor.
app.use("/api/usuarios", require("./routes/usuariosRoutes"));
app.use("/api/catalogo", require("./routes/catalogosRoutes"));
app.use("/api/categorias", require("./routes/categoriasRoutes"));
app.use("/api/login", require("./routes/authRoutes"));

// Iniciamos el servidor en el puerto especificado en las variables de entorno.
app.listen(process.env.PORT, () => {
  console.log("Servidor corriendo en el puerto ", process.env.PORT);
});
