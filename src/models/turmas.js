const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TurmaSchema = new Schema(
  {
    descricao: {
      type: String,
      minlength: 1,
      uppercase: true,
      required: true,
    },
    tipo: {
      type: String,
      enum: ["interno", "externo"],
      default: "interno",
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("turmas", TurmaSchema);
