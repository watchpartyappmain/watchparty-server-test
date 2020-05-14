module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    firstname: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: { notNull: true },
    },
    lastname: {
      type: DataTypes.STRING(32),
      allowNull: false,
      validate: { notNull: true },
    },
    password: {
      type: DataTypes.STRING(),
      allowNull: false,
      validate: { notNull: true, len: [8, 256] },
    },
  }, {
    freezeTableName: true,
  });
  // Associations
  User.associate = (models) => {
    User.belongsToMany(models.User, {
      foreignKey: 'followeeId',
      as: 'followers',
      through: 'UserFollower',
    });
    User.belongsToMany(models.User, {
      foreignKey: 'followerId',
      as: 'following',
      through: 'UserFollower',
    });
  };
  // Custom methods
  return User;
};
