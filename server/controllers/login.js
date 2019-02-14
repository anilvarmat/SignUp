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
  const { email, username, password } = req.body;
  console.log(JSON.stringify(req.body));
  if (req.body && req.body.username && req.body.password) {
    const emailExists = await User.findOne({ email: username, password });
    const usernameExists = await User.findOne({ username, password });
    console.log(emailExists);
    console.log(usernameExists);
    if (emailExists || usernameExists) {
      res.json({
        success: true,
        msg: "Logged in Successfully"
      });
    } else {
      res.json({ success: false, msg: "Ivalid Username or password" });
    }
  } else {
    res.json({ success: false, msg: "Ivalid Username or password" });
  }
});
module.exports = router;
