const express = require("express"),
  router = express.Router(),
  bodyParser = require("body-parser"),
  skills = require("../models/skills");
router.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
router.use(bodyParser.json({ limit: "5mb" }));
router.get("/", async function(req, res) {
  const query = new RegExp("^" + req.query.q + ".*$");
  const result = [];
  console.log(query);
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  skills.find({ name: { $regex: query, $options: "i" } }, function(
    err,
    keywords
  ) {
    console.log(keywords);
    keywords.forEach(function(k) {
      result.push(k.name);
    });
    res.json({ skills: result });
  });
});
module.exports = router;
