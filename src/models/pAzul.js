const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PSchema = new Schema(
  {
   marca: {
      type: String,
      minlength: 3,
      maxlength: 70,
      required: true,
    },
   preco: {
      type: Number,
      min: 4,
      required: true,
    },
    codP: {
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

module.exports = mongoose.model("pAzul", PSchema);
