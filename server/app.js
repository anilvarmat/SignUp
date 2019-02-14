const express = require("express"),
  mongoose = require("mongoose"),
  http = require("http"),
  db = require("./models/db"),
  { config } = require("dotenv");
config();
const app = express();
//const { routes } = require("./utilities/routes");
const skills = require("./controllers/skills");
const countries = require("./controllers/countries");
const saveUser = require("./controllers/signup");
const login = require("./controllers/login");
const userProfile = require("./controllers/userProfile");
// for (const route of routes) {
//   console.log(route.routePath);
//   console.log(route.router);
//   app.use(route.routePath, route.router);
// }
app.use("/test", function(req, res) {
  console.log(JSON.stringify(req.headers));
  res.send("Email Service");
});
app.use("/api/skills", skills);
app.use("/api/countries", countries);
app.use("/api/saveUser", saveUser);
app.use("/api/login", login);
app.use("/api/userProfile", userProfile);
(async () => {
  try {
    await db.connectDB();
    await http.createServer(app).listen(process.env.PORT);
    console.log("Express Server is running on port : " + process.env.PORT);
  } catch (e) {
    console.error(`Server startup failed. Error: ${e}`);
    console.error(e.stack);
  }
})();

const logFunction = console.log;
const errFunction = console.error;

console.log = logStatement => {
  logFunction(new Date() + " " + logStatement);
};

console.error = errStatement => {
  errFunction(new Date() + " " + errStatement);
};
