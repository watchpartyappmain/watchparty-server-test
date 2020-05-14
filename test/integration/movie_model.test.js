const chai = require('chai');
chai.use(require('sinon-chai'));

const { expect } = chai;
const models = require('../../models');

describe('models/movie', () => {
  context('Part of a Sublist', () => {
    let result;
    before(function () { // eslint-disable-line prefer-arrow-callback, func-names
      return new Promise((resolve) => {
        setTimeout(async () => {
          await models.User.destroy({ where: { email: 'integrationtestmovieemailone@gmail.com' } });
          const userobject = await models.User.create({
            email: 'integrationtestmovieemailone@gmail.com',
            firstname: 'fn1',
            lastname: 'ln1',
            password: 'testpassword',
          });
          const movieobject = await models.Movie.create({
            userid: userobject.id,
            tmdbid: 12345,
            watchstate: 'to-watch',
          });
          await models.Sublist.create({ name: 'TestSublist', movieID: movieobject.id, userID: userobject.id });
          result = await movieobject.getSublistBelongsTo();
          resolve();
        }, 200);
      });
    });
    it('getSublistBelongsTo returned an existing sublist', async () => {
      const answer = JSON.parse(JSON.stringify(result))[0].name;
      expect(answer).to.equal('TestSublist');
    });
  });
  context('Not part of a Sublist', () => {
    let result;
    before(function () { // eslint-disable-line prefer-arrow-callback, func-names
      return new Promise((resolve) => {
        setTimeout(async () => {
          await models.User.destroy({ where: { email: 'integrationtestmovieemailtwo@gmail.com' } });
          const userobject = await models.User.create({
            email: 'integrationtestmovieemailtwo@gmail.com',
            firstname: 'fn1',
            lastname: 'ln1',
            password: 'testpassword',
          });
          const movieobject = await models.Movie.create({
            userid: userobject.id,
            tmdbid: 12345,
            watchstate: 'to-watch',
          });
          result = await movieobject.getSublistBelongsTo();
          resolve();
        }, 200);
      });
    });
    it('getSublistBelongsTo returns no sublist', async () => {
      expect(result.length).to.equal(0);
    });
  });
});
