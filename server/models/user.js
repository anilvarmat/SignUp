const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  email: { type: String, required: true, index: { unique: true } },
  firstname: { type: String, required: true },
  lastname: { type: String, required: false },
  password: { type: String, required: true },
  dob: { type: Date },
  skills: { type: Array },
  country: { type: Object }
});
module.exports = mongoose.model("user", UserSchema);
