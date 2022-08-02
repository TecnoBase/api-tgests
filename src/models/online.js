const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OInscricaoSchema = new Schema(
  {
    cursoId: {
      type: Schema.Types.ObjectId,
      ref: "cursos",
      required: false,
    },
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
    provincia: {
      type: String,
      minlength: 3,
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
    modAula: {
      type: String,
      enum: ["online", "presencial"],
      required: true,
    },
    email: {
      type: String,
      minlength: 12,
      lowercase: true,
    },
    image: {
      type: String,
      required: false,
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

module.exports = mongoose.model("onlines", OInscricaoSchema);
