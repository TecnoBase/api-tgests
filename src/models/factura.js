const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FacturaSchema = new Schema(
  {
    inscricaoId: {
      type: Schema.Types.ObjectId,
      ref: "inscricoes",
      required: true,
    },
     codFactura: {
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
