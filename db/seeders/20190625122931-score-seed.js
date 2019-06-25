"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Scores",
      [
        {
          system: "tss",
          repoName: "digital-canada-ca",
          score: '{"value":156,"clarity":0.87,"ambiguity":0.12}',
          createdAt: "2019-06-25T17:48:24.566Z",
          updatedAt: "2019-06-25T17:48:24.567Z"
        },
        {
          system: "tss",
          repoName: "digital-canada-ca",
          score: '{"value":339,"clarity":0.65,"ambiguity":1}',
          createdAt: "2019-06-26T17:48:24.567Z",
          updatedAt: "2019-06-25T17:48:24.567Z"
        },
        {
          system: "tss",
          repoName: "digital-canada-ca",
          score: '{"value":300,"clarity":0.5,"ambiguity":0.12}',
          createdAt: "2019-06-27T17:48:24.567Z",
          updatedAt: "2019-06-25T17:48:24.567Z"
        },
        {
          system: "tss",
          repoName: "digital-canada-ca",
          score: '{"value":495,"clarity":0.11,"ambiguity":0.06}',
          createdAt: "2019-06-28T17:48:24.567Z",
          updatedAt: "2019-06-25T17:48:24.567Z"
        },
        {
          system: "tss",
          repoName: "digital-canada-ca",
          score: '{"value":138,"clarity":0.17,"ambiguity":0.11}',
          createdAt: "2019-06-29T17:48:24.567Z",
          updatedAt: "2019-06-25T17:48:24.567Z"
        },
        {
          system: "tss",
          repoName: "digital-canada-ca",
          score: '{"value":476,"clarity":0.11,"ambiguity":0.66}',
          createdAt: "2019-06-30T17:48:24.567Z",
          updatedAt: "2019-06-25T17:48:24.567Z"
        },
        {
          system: "tss",
          repoName: "digital-canada-ca",
          score: '{"value":278,"clarity":0.26,"ambiguity":0.5}',
          createdAt: "2019-07-01T17:48:24.567Z",
          updatedAt: "2019-06-25T17:48:24.567Z"
        },
        {
          system: "tss",
          repoName: "digital-canada-ca",
          score: '{"value":309,"clarity":0.79,"ambiguity":0.38}',
          createdAt: "2019-07-02T17:48:24.567Z",
          updatedAt: "2019-06-25T17:48:24.567Z"
        },
        {
          system: "tss",
          repoName: "digital-canada-ca",
          score: '{"value":141,"clarity":0.95,"ambiguity":0.1}',
          createdAt: "2019-07-03T17:48:24.567Z",
          updatedAt: "2019-06-25T17:48:24.567Z"
        },
        {
          system: "tss",
          repoName: "digital-canada-ca",
          score: '{"value":115,"clarity":0.72,"ambiguity":0.69}',
          createdAt: "2019-07-04T17:48:24.567Z",
          updatedAt: "2019-06-25T17:48:24.567Z"
        },
        {
          system: "tss",
          repoName: "digital-canada-ca",
          score: '{"value":342,"clarity":0.25,"ambiguity":0.59}',
          createdAt: "2019-07-05T17:48:24.567Z",
          updatedAt: "2019-06-25T17:48:24.567Z"
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
