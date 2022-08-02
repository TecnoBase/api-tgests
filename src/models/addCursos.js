const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddCursoSchema = new Schema(
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
    isDeleted: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("addcursos", AddCursoSchema);
