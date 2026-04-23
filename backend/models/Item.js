const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  itemName: String,
  description: String,
  type: { type: String, enum: ["Lost", "Found"] },
  location: String,
  date: Date,
  contactInfo: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);