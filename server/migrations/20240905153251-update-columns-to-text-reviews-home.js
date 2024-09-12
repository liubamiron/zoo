'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Review table
    await queryInterface.changeColumn('reviews', 'short_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('reviews', 'short_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('reviews', 'short_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('reviews', 'long_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('reviews', 'long_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('reviews', 'long_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    // HomePage table
    await queryInterface.changeColumn('home_pages', 'short_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'short_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'short_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'long_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'long_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'long_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'about_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'about_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'about_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    // ActivitiesItem table
    await queryInterface.changeColumn('activities_items', 'short_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('activities_items', 'short_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('activities_items', 'short_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('activities_items', 'long_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('activities_items', 'long_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('activities_items', 'long_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    // Post table
    await queryInterface.changeColumn('posts', 'short_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('posts', 'short_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('posts', 'short_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('posts', 'long_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('posts', 'long_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('posts', 'long_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('reviews', 'short_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('reviews', 'short_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('reviews', 'short_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('reviews', 'long_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('reviews', 'long_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('reviews', 'long_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    // HomePage table
    await queryInterface.changeColumn('home_pages', 'short_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'short_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'short_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'long_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'long_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'long_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'about_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'about_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('home_pages', 'about_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    // ActivitiesItem table
    await queryInterface.changeColumn('activities_items', 'short_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('activities_items', 'short_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('activities_items', 'short_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('activities_items', 'long_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('activities_items', 'long_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('activities_items', 'long_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    // Post table
    await queryInterface.changeColumn('posts', 'short_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('posts', 'short_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('posts', 'short_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('posts', 'long_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('posts', 'long_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.changeColumn('posts', 'long_description_en', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  }
};
