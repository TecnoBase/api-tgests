const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsuarioSchema = new Schema(
  {
    nome: {
      type: String,
      minlength: 3,
      required: true,
    },
    email: {
      type: String,
      minlength: 13,
      lowercase: true,
      required: true,
    },
    senhaClara: {
      type: String,
      required: true,
    },
    senha: {
      type: String,
      unique: true,
      required: true,
    },
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
    rules: {
      type: String,
      enum: ["user", "admin", "gest"],
      default: "user",
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

module.exports = mongoose.model("usuarios", UsuarioSchema);
