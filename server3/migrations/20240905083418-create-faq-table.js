'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
        await queryInterface.createTable('faqs', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
          },
          question_ru: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          question_ro: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          question_en: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          answer_ru: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          answer_ro: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          answer_en: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
          },
          updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
          }
        });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('faqs');
  }
};
