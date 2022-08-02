const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Tickets = new Schema(
  {
    assunto: {
      type: String,
      minlength: 3,
      required: true,
    },
    detalhes: {
      type: String,
      maxlength: 100000,
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

module.exports = mongoose.model("tickets", Tickets);
