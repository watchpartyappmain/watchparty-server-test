const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../app');

const { expect } = chai;
chai.use(chaiHttp);
describe('Server', () => {
  it('does not pong on wrong input (error 401)', (done) => {
    chai
      .request(app)
      .post('/api/ping')
      .send({ message: 'ping', token: 'fake' })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('results in error on no input (error 400)', (done) => {
    chai
      .request(app)
      .post('/api/ping')
      .send({ message: 'ping' })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('pongs on correct input (status 200)', (done) => {
    const secretWord = 'dodo';
    const timestamp = Math.floor(Date.now() / 100000);
    const combination = secretWord + timestamp.toString();
    const hashTimestamp = () => {
      chai
        .request(app)
        .post('/api/ping')
        .send({ message: 'ping', token: combination })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    };
    hashTimestamp();
  });
});
