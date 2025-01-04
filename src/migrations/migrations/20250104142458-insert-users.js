'use strict';
const fs = require('fs');
const path = require('path');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const usersData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../seed/user-seed.json'), 'utf8'));
    const usersWithTimestamps = usersData.map(user => ({
      ...user,
      createdAt: Sequelize.fn('NOW'), // Set 'createdAt' to current timestamp
      updatedAt: Sequelize.fn('NOW'), // Set 'updatedAt' to current timestamp
    }));
    // Insert data into the `User` table
    await queryInterface.bulkInsert('users', usersWithTimestamps, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
