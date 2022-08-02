const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormadorSchema = new Schema(
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
    certifCENFFOR: {
      type: String,
      maxlength: 16,
      minlength: 6,
    },
    naturalidade: {
      type: String,
      maxlength: 10,
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
      required: true,
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
    image: {
      type: String,
      required: false,
    },
    codFormador: {
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

module.exports = mongoose.model("formadores", FormadorSchema);
