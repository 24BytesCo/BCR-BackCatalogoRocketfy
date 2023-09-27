// Importamos los módulos Schema y model de Mongoose para definir el esquema del modelo.
const { Schema, model } = require("mongoose");

// Definimos el esquema del modelo 'Usuario'.
const usuarioSchema = Schema({
  nombreCompleto: {
    type: String,
    required: true, // Campo obligatorio
  },
  correoElectronico: {
    type: String,
    required: true, // Campo obligatorio
    unique: true, // Debe ser único en la base de datos
  },
  contrasenia: {
    type: String,
    required: true, // Campo obligatorio
  },
  google: {
    type: Boolean,
    default: false, // Valor predeterminado: false
  },
  imagen: {
    type: String, // Tipo de dato String para la URL de la imagen
  },
  rol: {
    type: String,
    required: true, // Campo obligatorio
    default: "USER_ROLE", // Valor predeterminado: "USER_ROLE"
  },
  activo: {
    type: Boolean,
    default: true, // Valor predeterminado: true
  },
});

usuarioSchema.method('toJSON', function() {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
})

// Exportamos el modelo 'Usuario' basado en el esquema 'usuarioSchema'.
module.exports = model("Usuario", usuarioSchema);
