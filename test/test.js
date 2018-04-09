var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
chai.use(chaiHttp);


describe('API', function() {
	it('should return status of 200, should return JSON. should return proper data on GET /api/names', function(done) {
		 chai.request(server)
		   .get('/api/names')
		   .end(function(err, res){
		     res.should.have.status(200);
		     res.should.be.json;
		     res.body.should.be.a('array');
		     done();
		   });
	});
	it('should return 1 result, result should be "George Johnson" on GET /api/names?search=George', function(done) {
	 chai.request(server)
	   .get('/api/names?search=George')
	   .end(function(err, res){
	     res.body.should.have.length(1);
	     res.body[0].should.equal('George Johnson');
	     done();
	   });
	});
});

