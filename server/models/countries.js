const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const CountriesSchema = new Schema({
  id: { type: String, required: true, index: { unique: true } },
  value: { type: String, required: true, index: { unique: true } }
});
module.exports = mongoose.model("countries", CountriesSchema);
