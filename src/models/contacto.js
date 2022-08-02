const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Contactoschema = new Schema(
  {
    email: {
      type: String,
      minlength: 3,
      maxlength: 70,
      required: true,
    },
   assunto: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
    },
   mensagem: {
      type: String,
      minlength: 3,
      maxlength: 20,
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

module.exports = mongoose.model("contactos", Contactoschema);
