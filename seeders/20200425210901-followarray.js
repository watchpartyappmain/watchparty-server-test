module.exports = {

  up: (queryInterface, Sequelize) => { // eslint-disable-line no-unused-vars
    const FollowArray = [];
    for (let i = 1; i < 10; i += 1) {
      FollowArray.push({
        followerId: i,
        followeeId: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    for (let i = 1; i < 10; i += 1) {
      FollowArray.push({
        followerId: 20,
        followeeId: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    for (let i = 1; i < 5; i += 1) {
      FollowArray.push({
        followerId: i,
        followeeId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return queryInterface.bulkInsert("UserFollower", FollowArray);
  },
  /* eslint-disable no-unused-vars */
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete("Follow", null),
  /* eslint-enable no-unused-vars */

};
