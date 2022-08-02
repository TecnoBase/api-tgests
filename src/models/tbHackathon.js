const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HackathonSchema = new Schema(
  {
    startupId: {
      type: Schema.Types.ObjectId,
      ref: "startups",
      required: true,
    },
   areaId: {
      type: Schema.Types.ObjectId,
      ref: "areas",
      required: true,
    },
    pagamento: {
      type: String,
      minlength: 3,
      required: true,
    },
    preco: {
      type: Number,
      min: 4,
      required: true,
    },
    codHackathon: {
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

module.exports = mongoose.model("hackathons", HackathonSchema);
