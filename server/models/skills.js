const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const SkillsSchema = new Schema({
  name: { type: String, required: true, index: { unique: true } }
});
module.exports = mongoose.model("Skills", SkillsSchema);
