'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('animals', 'img_3', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('animals', 'img_4', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('animals', 'img_3');
    await queryInterface.removeColumn('animals', 'img_4');
  },
};
