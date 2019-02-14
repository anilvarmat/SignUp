const express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser"),
  User = require("../models/user"),
  moment = require("moment"),
  cors = require("cors");
router.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
router.use(bodyParser.json({ limit: "5mb" }));
router.use(cors());
router.options("*", cors());
router.post("/", async function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  const { username, password } = req.body;
  console.log(JSON.stringify(req.body));
  if (req.body && req.body.username) {
    const emailExists = await User.findOne({ email: username });
    const usernameExists = await User.findOne({ username });
    console.log(emailExists);
    console.log(usernameExists);
    if (emailExists || usernameExists) {
      const { email, username, firstname, lastname, dob, skills, country } =
        usernameExists || emailExists;
      let skill = [];
      const skillsList = skills.map(val => {
        skill.push(val.value);
      });
      const skillsRes = skill.join(",");
      const countryVal = country.value;
      const responseObj = {
        email,
        username,
        firstname,
        lastname,
        dob: moment(dob).format("MM/DD/YYYY"),
        skills: skillsRes,
        country: countryVal
      };
      res.json({
        success: true,
        data: responseObj,
        msg: "Logged in Successfully"
      });
    } else {
      res.json({ success: false, msg: "Ivalid Username" });
    }
  } else {
    res.json({ success: false, msg: "Ivalid Username" });
  }
});
module.exports = router;
