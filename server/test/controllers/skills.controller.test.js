const chai = require("chai"),
  chaiHttp = require("chai-http"),
  expect = chai.expect;

chai.use(chaiHttp);
it("/skills should return array of skills", function(done) {
  chai
    .request("http://localhost:4005")
    .get("/api/skills?q=jav")
    .end(function(err, res) {
      expect(res.statusCode).to.equal(200);
      expect(res.body.skills).to.deep.equal([
        "Java",
        "JavaScript",
        "JavaFX Script"
      ]);
      done();
    });
});
it("/skills should return empty array of skills", function(done) {
  chai
    .request("http://localhost:4005")
    .get("/api/skills?q=hklskdsdh")
    .end(function(err, res) {
      expect(res.statusCode).to.equal(200);
      expect(res.body.skills).to.deep.equal([]);
      done();
    });
});
