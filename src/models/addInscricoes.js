const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddInscricaoSchema = new Schema(
  {
    cursoId: {
      type: Schema.Types.ObjectId,
      ref: "cursos",
      required: true,
    },
    formadorId: {
      type: Schema.Types.ObjectId,
      ref: "formadores",
      required: true,
    },
    horarioId: {
      type: Schema.Types.ObjectId,
      ref: "horarios",
      required: true,
    },  
    periodo: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tbcinscricoes", AddInscricaoSchema);
