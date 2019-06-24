"use strict";

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Repos",
      [
        {
          repoName: "test",
          statistics: JSON.stringify({ data: "my repo" }),
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: function(queryInterface, Sequelize) {
    queryInterface.bulkDelete("Users", [
      {
        first_name: "John"
      }
    ]);
  }
};
