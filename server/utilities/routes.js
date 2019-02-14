const login = require("../controllers/login"),
  signup = require("../controllers/signup"),
  userProfile = require("../controllers/userProfile"),
  logout = require("../controllers/logout"),
  skills = require("../controllers/skills");
module.exports = {
  routes: [
    {
      routePath: "/api/signup",
      router: signup
    },
    {
      routePath: "/api/skills",
      router: skills
    }

    // {
    //   routePath: "/api/login",
    //   router: login,
    // },
    // {
    //   routePath: "/api/userprofile",
    //   router: userProfile,
    // },

    // {
    //   routePath: "/api/logout",
    //   router: logout,
    // },
  ]
};
