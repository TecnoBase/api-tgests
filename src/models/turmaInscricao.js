const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TurmaInscricaoSchema = new Schema(
  {
    addCursoId: {
      type: Schema.Types.ObjectId,
      ref: "addcursos",
      required: true,
    },
    horarioId: {
      type: Schema.Types.ObjectId,
      ref: "horarios",
      required: false,
    },
    inscricaoId: {
      type: Schema.Types.ObjectId,
      ref: "inscricoes",
      required: true,
    },
    turmaId: {
      type: Schema.Types.ObjectId,
      ref: "turmas",
      required: true,
    },
    inicio: {
      type: Date,
      required: true,
    },
    termino: {
      type: Date,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tinscricoes", TurmaInscricaoSchema);
