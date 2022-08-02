const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormandoSchema = new Schema(
  {
    nome: {
      type: String,
      maxlength: 20,
      minlength: 3,
      required: true,
    },
    sobrenome: {
      type: String,
      maxlength: 10,
      minlength: 3,
      required: true,
    },
    naturalidade: {
      type: String,
      minlength: 3,
      required: true,
    },
    nascimento: {
      type: Date,
      required: true,
    },
    bi: {
      type: String,
      maxlength: 14,
      minlength: 14,
      unique: true,
      required: true,
    },
    telefone: {
      type: Number,
      minlength: 9,
      required: true,
    },
    genero: {
      type: String,
      enum: ["M", "F"],
      maxlength: 1,
      required: true,
    },
    endereco: {
      type: String,
      minlength: 3,
      required: true,
    },
    email: {
      type: String,
      minlength: 12,
      lowercase: true,
     },
    tipo: {
      type: String,
      default: ["interno", "externo"],
      required: true
    },
    areaFormacao: {
      type: String,
      maxlength: 50,
      minlength: 2,
      required: true,
    },
    docEntregue: {
      type: String,
    },
    image: {
      type: String,
      required: false,
    },
    codFormando: {
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

module.exports = mongoose.model("formandos", FormandoSchema);
