const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  name: String,
  type: String,
  base64: String,
});

const uploadSchema = new mongoose.Schema({
  title: String,
  description: String,
  images: [imageSchema],
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("uploadimages", uploadSchema);
