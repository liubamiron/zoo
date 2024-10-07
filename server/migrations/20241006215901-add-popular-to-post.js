'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adding the 'popular' column to the 'post' table
    return queryInterface.addColumn('posts', 'popular', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false, // Default value set to false
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Removing the 'popular' column in case of rollback
    return queryInterface.removeColumn('posts', 'popular');
  }
};
