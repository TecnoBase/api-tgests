const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Municipio = new Schema(
  {
    provincia: {
      type: String,
      minlength: 3,
      required: true,
    }, 
    descricao: {
      type: String,
      minlength: 3,
      required: true,
    },
    codMunicipio: {
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
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("municipios", Municipio);
