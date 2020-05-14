module.exports = {
  up: async (queryInterface, Sequelize) => { // eslint-disable-line no-unused-vars
    const movies = [];
    const sublists = [];
    const userid1 = 20;
    const numOfMovies = 20;
    for (let i = 1; i <= numOfMovies; i += 1) {
      movies.push({
        userid: userid1,
        tmdbid: i,
        watchstate: 'to-watch',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    // Assign movies to sublists
    // movies 1-5  => sublist-1
    // movies 6-10 => sublist-2
    // ...
    // movies 16-20 => sublist-4
    for (let i = 1; i <= numOfMovies; i += 1) {
      sublists.push({
        userID: userid1,
        name: `sublist-${Math.ceil(i / 5)}`,
        movieID: i,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    // Perform bulk insertions one at a time
    await queryInterface.bulkInsert('Movie', movies);
    return queryInterface.bulkInsert('Sublist', sublists);
  },

  down: async (queryInterface, Sequelize) => { // eslint-disable-line no-unused-vars
    // Perform bulk deletitions one at a time
    await queryInterface.bulkDelete('Movie');
    return queryInterface.bulkDelete('Sublist');
  },
};
