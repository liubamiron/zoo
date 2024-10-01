'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Remove the existing columns
    await queryInterface.removeColumn('events', 'time_event');
    await queryInterface.removeColumn('events', 'start_date_event');
    await queryInterface.removeColumn('events', 'end_date_event');

    // Add the columns again with DATE type
    await queryInterface.addColumn('events', 'time_event', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('events', 'start_date_event', {
      type: Sequelize.DATE,   // Use Sequelize.DATE for date
      allowNull: true
    });
    await queryInterface.addColumn('events', 'end_date_event', {
      type: Sequelize.DATE,   // Use Sequelize.DATE for date
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    // Revert the changes: remove the new columns and add the old ones back with STRING type
    await queryInterface.removeColumn('events', 'time_event');
    await queryInterface.removeColumn('events', 'start_date_event');
    await queryInterface.removeColumn('events', 'end_date_event');

    await queryInterface.addColumn('events', 'time_event', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('events', 'start_date_event', {
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('events', 'end_date_event', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};

