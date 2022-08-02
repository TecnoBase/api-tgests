const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CursoSchema = new Schema(
  {
    descricao: {
      type: String,
      minlength: 3,
      maxlength: 70,
      required: true,
    },
    detalhes: {
      type: String,
      maxlength: 500,
    },
    duracao: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
    tipo: {
      type: String,
      enum: ["interno", "externo"],
      default: "interno",
    },
    especial: {
      type: String,
      enum: ["curso", "treinamento"],
      default: "curso",
    },
    preco: {
      type: Number,
      min: 4,
      required: true,
    },
    pagamentoF: {
      type: String,
    },
    codCurso: {
      type: String,
      unique: true,
      maxlength: 8,
      minlength: 6,
      required: true,
    },
    image: {
      type: String,
      required: false,
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

module.exports = mongoose.model("cursos", CursoSchema);
