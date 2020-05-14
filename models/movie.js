module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define("Movie", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'uniqueusermovie',
      validate: { notNull: true },
    },
    tmdbid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: 'uniqueusermovie',
      validate: { notNull: true },
    },
    watchstate: {
      type: DataTypes.ENUM,
      values: ['watched', 'to-watch', 'not-interested'],
      allowNull: false,
      validate: { notNull: true },
    },
  }, {
    freezeTableName: true,
  });
  Movie.associate = (models) => {
    Movie.belongsTo(models.User, {
      foreignKey: 'userid',
      onDelete: 'cascade',
    });
  };
  Movie.prototype.getUser = function () { // eslint-disable-line func-names
    return this.userid;
  };
  Movie.prototype.getSublistBelongsTo = function () { // eslint-disable-line func-names
    const Sublist = sequelize.import('sublist');
    return Sublist.findAll({ attributes: ['name'], where: { movieID: this.id } });
  };
  return Movie;
};
