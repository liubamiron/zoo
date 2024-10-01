'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('events', 'time_event', {
        type: Sequelize.STRING,
        allowNull: true, // Adjust this according to your needs
      });
  },

  async down (queryInterface, Sequelize) {

    // Revert the type changes if needed
    await queryInterface.changeColumn('events', 'time_event', {
      type: Sequelize.STRING,
      allowNull: true,
    });

  }
};
