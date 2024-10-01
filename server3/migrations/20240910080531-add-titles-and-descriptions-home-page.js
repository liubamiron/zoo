'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add title1 and description1 columns in multiple languages
    await queryInterface.addColumn('home_pages', 'title1_ro', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('home_pages', 'title1_ru', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('home_pages', 'title1_en', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn('home_pages', 'description1_ro', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('home_pages', 'description1_ru', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('home_pages', 'description1_en', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove title1 and description1 columns in multiple languages
    await queryInterface.removeColumn('home_pages', 'title1_ro');
    await queryInterface.removeColumn('home_pages', 'title1_ru');
    await queryInterface.removeColumn('home_pages', 'title1_en');

    await queryInterface.removeColumn('home_pages', 'description1_ro');
    await queryInterface.removeColumn('home_pages', 'description1_ru');
    await queryInterface.removeColumn('home_pages', 'description1_en');
  }
};
