const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ModuloSchema = new Schema(
  {
    cursoId: {
      type: Schema.Types.ObjectId,
      ref: "cursos",
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    valorModulo: {
      type: Number,
      min: 4,
      required: true,
    },
    codModulo: {
      type: String,
      unique: true,
      maxlength: 8,
      minlength: 6,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("modulos", ModuloSchema);
