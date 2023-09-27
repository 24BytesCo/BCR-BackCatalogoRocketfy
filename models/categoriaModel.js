// Importamos los módulos Schema y model de Mongoose para definir el esquema del modelo.
const { Schema, model } = require("mongoose");

// Definimos el esquema del modelo 'Categoria'.
const categoriaSchema = Schema({
  nombre: {
    type: String,
    required: true, // Campo obligatorio
  },

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
categoriaSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject(); // Eliminamos campos innecesarios

  object.id = _id; // Renombramos _id a uid

  return object;
});

// Exportamos el modelo 'Categoria' basado en el esquema 'CategoriaSchema'.
module.exports = model("Categoria", categoriaSchema);
