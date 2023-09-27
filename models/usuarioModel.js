const { Schema, model } = require("mongoose");

const usuarioSchema = Schema({
  nombreCompleto: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
    unique: true,
  },
  contrasenia: {
    type: String,
    required: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  imagen: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    default: "USER_ROLE",
  },
  activo: {
    type: Boolean,
    default: true,
  },
});

module.exports = model('Usuario', usuarioSchema);
