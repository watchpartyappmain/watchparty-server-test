module.exports = (sequelize, DataTypes) => {
  const Sublist = sequelize.define("Sublist", {
    name: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: 'namemovie',
      validate: { notNull: true },
    },
    movieID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'namemovie',
      validate: { notNull: true },
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'namemovie',
      validate: { notNull: true },
    },
  }, {
    freezeTableName: true,
  });
  // Associations
  Sublist.associate = (models) => {
    Sublist.belongsTo(models.Movie, {
      foreignKey: 'movieID',
      onDelete: 'cascade',
    });
    Sublist.belongsTo(models.User, {
      foreignKey: 'userID',
      onDelete: 'cascade',
    });
  };
  // Custom methods
  Sublist.prototype.getMovies = function () { // eslint-disable-line func-names
    const Movie = sequelize.import('movie');
    return Sublist.findAll({
      include: [{
        model: Movie,
        attributes: ['tmdbid'],
      }],
      attributes: ['id'],
      where: {
        userID: this.userID,
        name: this.name,
      },
    });
  };

  return Sublist;
};
