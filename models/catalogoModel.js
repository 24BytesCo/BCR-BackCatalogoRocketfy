// Importamos los módulos Schema y model de Mongoose para definir el esquema del modelo.
const { Schema, model } = require("mongoose");

// Definimos el esquema del modelo 'Catalogo'.
const catalogoSchema = Schema({
  nombreProducto: {
    type: String,
    required: true, // Campo obligatorio
  },

  descripcion: {
    type: String,
    required: true, // Campo obligatorio
  },

  precio: {
    type: String,
    required: true
  },
 
  imagen: {
    type: String, // Tipo de dato String para la URL de la imagen
  },

  categoria: [{
    type: Schema.Types.ObjectId,
    ref: "Categoria"
  }],

  usuarioCrea: {
    type: Schema.Types.ObjectId,
    ref: "Usuario"
  },

  activo: {
    type: Boolean,
    default: true, // Valor predeterminado: true
  },
});

// Definimos un método personalizado toJSON para personalizar la respuesta JSON.
catalogoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject(); // Eliminamos campos innecesarios

  object.id = _id; // Renombramos _id a uid

  return object;
});

// Exportamos el modelo 'Catalogo' basado en el esquema 'CatalogoSchema'.
module.exports = model("Catalogo", catalogoSchema);
