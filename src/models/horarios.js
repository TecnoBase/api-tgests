const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HorarioSchema = new Schema(
  {
    inicio: {
      type: String,
      maxlength: 5,
      required: true,
    },
    termino: {
      type: String,
      maxlength: 5,
      required: true,
    },
    dias: {
      type: String,
      maxlength: 50,
      required: true,
    },
    codHorario: {
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

module.exports = mongoose.model("horarios", HorarioSchema);
