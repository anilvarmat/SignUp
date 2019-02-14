const chai = require("chai"),
  chaiHttp = require("chai-http"),
  expect = chai.expect;

chai.use(chaiHttp);
it("/countries should return array of countries", function(done) {
  chai
    .request("http://localhost:4005")
    .get("/api/countries?q=Ind")
    .end(function(err, res) {
      expect(res.statusCode).to.equal(200);
      expect(res.body.countries).to.deep.equal(["India", "Indonesia"]);
      done();
    });
});
it("/countries should return empty array of countries", function(done) {
  chai
    .request("http://localhost:4005")
    .get("/api/countries?q=lskdkddjdjfh")
    .end(function(err, res) {
      expect(res.statusCode).to.equal(200);
      expect(res.body.countries).to.deep.equal([]);
      done();
    });
});
