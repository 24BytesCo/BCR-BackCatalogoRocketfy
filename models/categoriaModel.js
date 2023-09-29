// Importamos los módulos Schema y model de Mongoose para definir el esquema del modelo.
const { Schema, model } = require("mongoose");

// Definimos el esquema del modelo 'Categoria'.
const categoriaSchema = Schema({
  // Nombre de la categoría, es un campo de tipo String y es obligatorio.
  nombre: {
    type: String,
    required: true, // Campo obligatorio
  },

  // Usuario que creó la categoría, es una referencia a otro modelo 'Usuario' mediante su ID.
  usuarioCrea: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },

  // Indica si la categoría está activa o no, es un campo de tipo Boolean con valor predeterminado true.
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

// Exportamos el modelo 'Categoria' basado en el esquema 'categoriaSchema'.
module.exports = model("Categoria", categoriaSchema);
