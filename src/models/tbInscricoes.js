const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TBInscricaoSchema = new Schema(
  {
    tbcinscricaoId: {
      type: Schema.Types.ObjectId,
      ref: "tbcinscricoes",
      required: true,
    },
    formandoId: {
      type: Schema.Types.ObjectId,
      ref: "formandos",
      required: true,
    },
      pagamento: {
        type: String,
        minlength: 3,
        required: true,
    },

    valorInscricao: {
      type: Number,
      min: 4,
      required: true,
    },
    codInscricao: {
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

module.exports = mongoose.model("tbinscricoes", TBInscricaoSchema);
