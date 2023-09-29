// Importamos los módulos Schema y model de Mongoose para definir el esquema del modelo.
const { Schema, model } = require("mongoose");

// Definimos el esquema del modelo 'Usuario'.
const usuarioSchema = Schema({
  // Nombre completo del usuario, es un campo de tipo String y es obligatorio.
  nombreCompleto: {
    type: String,
    required: true, // Campo obligatorio
  },

  // Correo electrónico del usuario, es un campo de tipo String, obligatorio y debe ser único.
  correoElectronico: {
    type: String,
    required: true, // Campo obligatorio
    unique: true, // Debe ser único en la base de datos
  },

  // Contraseña del usuario, es un campo de tipo String y es obligatorio.
  contrasenia: {
    type: String,
    required: true, // Campo obligatorio
  },

  // Indicador de cuenta de Google, es un campo de tipo Boolean con valor predeterminado false.
  google: {
    type: Boolean,
    default: false, // Valor predeterminado: false
  },

  // URL de la imagen del usuario, es un campo de tipo String para la URL de la imagen.
  imagen: {
    type: String,
  },

  // Rol del usuario, es un campo de tipo String, obligatorio, con valor predeterminado "USER_ROLE".
  rol: {
    type: String,
    required: true, // Campo obligatorio
    default: "ADMIN", // Valor predeterminado: "USER_ROLE"
  },

  // Indica si la cuenta de usuario está activa o no, es un campo de tipo Boolean con valor predeterminado true.
  activo: {
    type: Boolean,
    default: true, // Valor predeterminado: true
  },
});

// Definimos un método personalizado toJSON para personalizar la respuesta JSON.
usuarioSchema.method("toJSON", function () {
  const { __v, _id, contrasenia, ...object } = this.toObject(); // Eliminamos campos innecesarios

  object.uid = _id; // Renombramos _id a uid

  return object;
});

// Exportamos el modelo 'Usuario' basado en el esquema 'usuarioSchema'.
module.exports = model("Usuario", usuarioSchema);
