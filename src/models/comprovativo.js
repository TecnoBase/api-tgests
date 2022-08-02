const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OInscricaoSchema = new Schema(
  {
    onlineId: {
      type: Schema.Types.ObjectId,
      ref: "onlines",
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    codComprovativo: {
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

module.exports = mongoose.model("comprovativos", OInscricaoSchema);
