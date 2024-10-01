'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
      await queryInterface.changeColumn('animals', 'name_ru', {
        type: Sequelize.TEXT,
        allowNull: false
      });
      await queryInterface.changeColumn('animals', 'name_ro', {
        type: Sequelize.TEXT,
        allowNull: false
      });
      await queryInterface.changeColumn('animals', 'name_en', {
        type: Sequelize.TEXT,
        allowNull: false
      });
      await queryInterface.changeColumn('animals', 'descr_short_ru', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('animals', 'descr_short_ro', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('animals', 'descr_short_en', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('animals', 'descr_long_ru', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('animals', 'descr_long_ro', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('animals', 'descr_long_en', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('animals', 'general_info_ru', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('animals', 'general_info_ro', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('animals', 'general_info_en', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('animals', 'facts_ru', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('animals', 'facts_ro', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('animals', 'facts_en', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('animals', 'habitat_long_ru', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('animals', 'habitat_long_ro', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('animals', 'habitat_long_en', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('tenders', 'description_ru', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('tenders', 'description_ro', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('tenders', 'description_en', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('events', 'short_description_ru', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('events', 'short_description_ro', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('events', 'short_description_en', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('events', 'long_description_ru', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('events', 'long_description_ro', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('events', 'long_description_en', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('news_items', 'short_description_ru', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('news_items', 'short_description_ro', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('news_items', 'short_description_en', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('news_items', 'long_description_ru', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('news_items', 'long_description_ro', {
        type: Sequelize.TEXT,
        allowNull: true
      });
      await queryInterface.changeColumn('news_items', 'long_description_en', {
        type: Sequelize.TEXT,
        allowNull: true
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('animals', 'name_ru', {
      type: Sequelize.TEXT,
      allowNull: false
    });
    await queryInterface.changeColumn('animals', 'name_ro', {
      type: Sequelize.TEXT,
      allowNull: false
    });
    await queryInterface.changeColumn('animals', 'name_en', {
      type: Sequelize.TEXT,
      allowNull: false
    });
    await queryInterface.changeColumn('animals', 'descr_short_ru', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('animals', 'descr_short_ro', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('animals', 'descr_short_en', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('animals', 'descr_long_ru', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('animals', 'descr_long_ro', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('animals', 'descr_long_en', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('animals', 'general_info_ru', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('animals', 'general_info_ro', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('animals', 'general_info_en', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('animals', 'facts_ru', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('animals', 'facts_ro', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('animals', 'facts_en', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('animals', 'habitat_long_ru', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('animals', 'habitat_long_ro', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('animals', 'habitat_long_en', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('tenders', 'description_ru', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('tenders', 'description_ro', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('tenders', 'description_en', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('events', 'short_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('events', 'short_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('events', 'short_description_en', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('events', 'long_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('events', 'long_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('events', 'long_description_en', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('news_items', 'short_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('news_items', 'short_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('news_items', 'short_description_en', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('news_items', 'long_description_ru', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('news_items', 'long_description_ro', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('news_items', 'long_description_en', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  }
};
