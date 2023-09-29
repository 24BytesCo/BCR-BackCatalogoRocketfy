// Importamos los módulos Schema y model de Mongoose para definir el esquema del modelo.
const { Schema, model } = require("mongoose");

// Definimos el esquema del modelo 'HistoricoPrecios'.
const historicoPreciosSchema = Schema({
  producto: {
    type: Schema.Types.ObjectId,
    ref: "Producto",
  },
  
  precioAntiguo: {
    type: Number,
    required: true, // Campo obligatorio
  },
  precioNuevo: {
    type: Number,
    required: true, // Campo obligatorio
  },

  usuarioCrea: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
  },


  fechaCreacion: {
    type: Date,
    default: Date.now, // Esto establece la fecha actual como valor predeterminado
  },

  activo: {
    type: Boolean,
    default: true, // Valor predeterminado: true
  },
});

// Definimos un método personalizado toJSON para personalizar la respuesta JSON.
historicoPreciosSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject(); // Eliminamos campos innecesarios

  object.id = _id; // Renombramos _id a uid

  return object;
});

// Exportamos el modelo 'HistoricoPrecios' basado en el esquema 'HistoricoPreciosSchema'.
module.exports = model("HistoricoPrecios", historicoPreciosSchema);
