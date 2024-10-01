'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('animals', 'conservation_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('animals', 'conservation_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('animals', 'conservation_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('animals', 'conservation_ru');
    await queryInterface.removeColumn('animals', 'conservation_ro');
    await queryInterface.removeColumn('animals', 'conservation_en');
  }
};
