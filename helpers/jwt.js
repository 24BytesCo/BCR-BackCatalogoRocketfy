const jwt = require("jsonwebtoken");

// Función para generar un token JWT basado en un UID (identificador único)
const generarJWT = (uid) => {
  // Devolver una promesa que genera un JWT
  return new Promise((resolve, reject) => {
    // Crear un payload que contiene el UID
    const payload = {
      uid,
    };
console.log("aqui", process.env.JWT_SECRET);
    // Firmar el token JWT utilizando el secret proporcionado en las variables de entorno
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "12h", // El token expirará en 12 horas
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el JWT"); // En caso de error, rechazar la promesa
        } else {
          resolve(token); // Si tiene éxito, resolver la promesa con el token JWT generado
        }
      }
    );
  });
};

// Exportar la función generarJWT para su uso en otros archivos
module.exports = {
  generarJWT,
};
