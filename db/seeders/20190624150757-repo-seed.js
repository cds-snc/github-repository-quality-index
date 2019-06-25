"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Repos",
      [
        {
          repoName: "repo-1",
          statistics: JSON.stringify({ pull_request: 1, approved: false }),
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          repoName: "repo-2",
          statistics: JSON.stringify({ pull_request: 1, approved: true }),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.bulkDelete("Repos", null, {});
  }
};
