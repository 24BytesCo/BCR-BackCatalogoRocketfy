// Importamos los módulos Schema y model de Mongoose para definir el esquema del modelo.
const { Schema, model } = require("mongoose");

// Definimos el esquema del modelo 'HistoricoStock'.
const historicoStockSchema = Schema({
  // Producto asociado al historial de stock, es una referencia a otro modelo 'Catalogo' mediante su ID.
  producto: {
    type: Schema.Types.ObjectId,
    ref: "Producto",
  },

  // Stock anterior en el historial de stock, es un campo de tipo Number y es obligatorio.
  stockAntiguo: {
    type: Number,
    required: true, // Campo obligatorio
  },

  // Stock nuevo en el historial de stock, es un campo de tipo Number y es obligatorio.
  stockNuevo: {
    type: Number,
    required: true, // Campo obligatorio
  },

  // Usuario que creó el historial de stock, es una referencia a otro modelo 'Usuario' mediante su ID.
  usuarioCrea: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },

  // Fecha de creación del historial de stock, valor predeterminado es la fecha actual.
  fechaCreacion: {
    type: Date,
    default: Date.now, // Esto establece la fecha actual como valor predeterminado
  },

  // Indica si el historial de stock está activo o no, valor predeterminado es true.
  activo: {
    type: Boolean,
    default: true, // Valor predeterminado: true
  },
});

// Definimos un método personalizado toJSON para personalizar la respuesta JSON.
historicoStockSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject(); // Eliminamos campos innecesarios

  object.id = _id; // Renombramos _id a id

  return object;
});

// Exportamos el modelo 'HistoricoStock' basado en el esquema 'historicoStockSchema'.
module.exports = model("HistoricoStock", historicoStockSchema);
