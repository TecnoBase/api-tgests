const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InscricaoSchema = new Schema(
  {
    formandoId: {
      type: Schema.Types.ObjectId,
      ref: "formandos",
      required: true,
    },
  moduloId: {
      type: Schema.Types.ObjectId,
      ref: "modulos",
      required: true,
    },
    pagamento: {
      type: String,
      minlength: 3,
      required: true,
    },
    periodo: {
      type: String,
      required: true,
    },
    valorMatricula: {
      type: Number,
      min: 4,
      required: true,
    },
    valorInscricao: {
      type: Number,
      min: 4,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    codInscricao: {
      type: String,
      unique: true,
      maxlength: 8,
      minlength: 5,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("inscricoes", InscricaoSchema);
