const express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser"),
  User = require("../models/user"),
  cors = require("cors");
router.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
router.use(bodyParser.json({ limit: "5mb" }));
router.use(cors());
router.options("*", cors());
router.post("/", async function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  const { email, username } = req.body;
  console.log(JSON.stringify(req.body));
  if (req.body && req.body.email && req.body.username) {
    const emailExists = await User.findOne({ email });
    const usernameExists = await User.findOne({ username });
    if (emailExists || usernameExists) {
      res.json({
        success: false,
        msg: "User already exists with same Username or Email"
      });
    } else {
      const { id } = await User.create(req.body);
      console.log(id);
      if (id) {
        res.json({ success: true, msg: "Successfully Created User" });
      } else {
        res.json({ success: false, msg: "Error saving details" });
      }
    }
  }
});
module.exports = router;
