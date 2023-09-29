// Importamos los módulos Schema y model de Mongoose para definir el esquema del modelo.
const { Schema, model } = require("mongoose");

// Definimos el esquema del modelo 'Producto'.
const productoSchema = Schema({
  // Nombre del producto, es un campo de tipo String y es obligatorio.
  nombre: {
    type: String,
    required: true, // Campo obligatorio
  },

  // Descripción del producto, es un campo de tipo String y es obligatorio.
  descripcion: {
    type: String,
    required: true, // Campo obligatorio
  },

  // Precio del producto, es un campo de tipo Number y es obligatorio.
  precio: {
    type: Number,
    required: true,
  },

  // Stock del producto, es un campo de tipo Number y es obligatorio.
  stock: {
    type: Number,
    required: true,
  },

  // URL de la imagen del producto, es un campo de tipo String y es obligatorio.
  imagen: {
    type: String, // Tipo de dato String para la URL de la imagen
    required: true,
  },

  // Categoría del producto, es una referencia a otro modelo 'Categoria' mediante su ID.
  categoria: [
    {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
    },
  ],

  // Usuario que creó el producto, es una referencia a otro modelo 'Usuario' mediante su ID.
  usuarioCrea: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },

  // Indica si el producto está activo o no, valor predeterminado es true.
  activo: {
    type: Boolean,
    default: true, // Valor predeterminado: true
  },
});

// Definimos un método personalizado toJSON para personalizar la respuesta JSON.
productoSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject(); // Eliminamos campos innecesarios

  object.id = _id; // Renombramos _id a uid

  return object;
});

// Exportamos el modelo 'Producto' basado en el esquema 'productoSchema'.
module.exports = model("Producto", productoSchema);
