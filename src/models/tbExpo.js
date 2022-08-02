const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpoSchema = new Schema(
  {
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
    startupId: {
      type: Schema.Types.ObjectId,
      ref: "startups",
      required: true,
    },
    projecto: {
      type: String,
      minlength: 3,
      required: true,
    },
    detalhes: {
      type: String,
      maxlength: 1500,
    },
    tipo: {
      type: String,
      enum: ["expo", "pre"],
      default: "expo",
    },
    preco: {
      type: Number,
      min: 4,
      required: true,
    },
    codExpo: {
      type: String,
      unique: true,
      maxlength: 8,
      minlength: 6,
      // required: true,
    },
    codPre: {
      type: String,
      unique: true,
      maxlength: 8,
      minlength: 6,
      // required: true,
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

module.exports = mongoose.model("expos", ExpoSchema);
