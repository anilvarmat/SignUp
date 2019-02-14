const chai = require("chai"),
  chaiHttp = require("chai-http"),
  expect = chai.expect;

chai.use(chaiHttp);
it("/login should return success", function(done) {
  chai
    .request("http://localhost:4005")
    .post("/api/login")
    .type("json")
    .send({
      username: "aneelvarma",
      password: "test@123"
    })
    .end(function(err, res) {
      console.log(res.body);
      expect(res.statusCode).to.equal(200);
      expect(res.body.success).to.equal(true);
    });
  done();
});
