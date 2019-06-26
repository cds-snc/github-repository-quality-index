'use strict';
module.exports = (sequelize, DataTypes) => {
  const Repo = sequelize.define('Repo', {
    repoName: DataTypes.STRING,
    statistics: DataTypes.JSON
  }, {});
  Repo.associate = function(models) {
    // associations can be defined here
  };
  return Repo;
};