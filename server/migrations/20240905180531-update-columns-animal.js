'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('animals', 'name_ru', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('animals', 'name_ro', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.changeColumn('animals', 'name_en', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('animals', 'name_ru', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('animals', 'name_ro', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.changeColumn('animals', 'name_en', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
