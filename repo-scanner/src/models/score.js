"use strict";
module.exports = (sequelize, DataTypes) => {
  const Score = sequelize.define(
    "Score",
    {
      repoName: DataTypes.STRING,
      score: DataTypes.JSON,
      system: DataTypes.STRING
    },
    {}
  );
  Score.associate = function(models) {
    // associations can be defined here
  };
  return Score;
};
