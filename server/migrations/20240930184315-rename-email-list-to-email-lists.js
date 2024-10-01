'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Rename the table from email_list to email_lists
    await queryInterface.renameTable('email_list', 'email_lists');
  },

  down: async (queryInterface, Sequelize) => {
    // Rollback by renaming it back to email_list
    await queryInterface.renameTable('email_lists', 'email_list');
  }
};
