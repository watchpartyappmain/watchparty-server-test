const chai = require('chai');
chai.use(require('sinon-chai'));

const { expect } = chai;

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const SublistModel = require('../../models/sublist');

describe('models/sublist', () => {
  const Sublist = SublistModel(sequelize, dataTypes);
  const sublist = new Sublist();

  checkModelName(Sublist)('Sublist');
  context('properties', () => {
    ['name', 'movieID'].forEach(
      checkPropertyExists(sublist),
    );
  });
  context('associations', () => {
    const Movie = 'some dummy movie';

    before(() => {
      Sublist.associate({ Movie });
    });

    it('defined a belongsTo association with Movie', () => {
      expect(Sublist.belongsTo).to.have.been.calledWith(Movie);
    });
  });
});
