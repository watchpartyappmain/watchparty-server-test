const bcrypt = require('bcrypt');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

module.exports = {
  up: async (queryInterface, Sequelize) => { // eslint-disable-line no-unused-vars
    const demoUserPassword = await bcrypt.hash(config.demo_user_password, config.salt_rounds);
    const usersArray = [];
    for (let i = 0; i < 100; i += 1) {
      usersArray.push({
        email: `testemail${i}@gmail.com`,
        firstname: `firstname${i}`,
        lastname: `lastname${i}`,
        password: demoUserPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("User", usersArray);
  },

  /* eslint-disable no-unused-vars */
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("User", null),
  /* eslint-enable no-unused-vars */
};
