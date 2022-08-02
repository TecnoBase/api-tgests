const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscriscaoSchema = new Schema(
  {
    email: {
      type: String,
      minlength: 12,
      lowercase: true,
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

module.exports = mongoose.model("subscricao", SubscriscaoSchema);
