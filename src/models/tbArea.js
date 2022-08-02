const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AreaSchema = new Schema(
  {
    descricao: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("areas", AreaSchema);
