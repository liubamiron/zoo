'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

    up: async (queryInterface, Sequelize) => {
      // Remove title_about columns
      await queryInterface.removeColumn('home_pages', 'title_about_ru');
      await queryInterface.removeColumn('home_pages', 'title_about_ro');
      await queryInterface.removeColumn('home_pages', 'title_about_es');

      // Remove about_description columns
      await queryInterface.removeColumn('home_pages', 'about_description_ru');
      await queryInterface.removeColumn('home_pages', 'about_description_ro');
      await queryInterface.removeColumn('home_pages', 'about_description_en');

      // Add img_3 column
      await queryInterface.addColumn('home_pages', 'img_3', {
        type: Sequelize.STRING,
        allowNull: true,
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('home_pages', 'title_about_ru', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('home_pages', 'title_about_ro', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('home_pages', 'title_about_es', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Add about_description columns back
    await queryInterface.addColumn('home_pages', 'about_description_ru', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('home_pages', 'about_description_ro', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('home_pages', 'about_description_en', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // Remove img_3 column
    await queryInterface.removeColumn('home_pages', 'img_3');
  }
};
