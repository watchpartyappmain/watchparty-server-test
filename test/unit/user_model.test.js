/* eslint-env mocha */
const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const UserModel = require('../../models/user');

describe('models/user', () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  checkModelName(User)('User');
  context('properties', () => {
    ['email', 'firstname', 'lastname', 'password'].forEach(
      checkPropertyExists(user),
    );
  });
});
