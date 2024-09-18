'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add postId column to the Tag table
    await queryInterface.addColumn('tags', 'postId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'posts',  // Name of the Post table
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });

    // Optionally, remove the PostTag table if not needed anymore
    await queryInterface.dropTable('PostTag');
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the postId column in case of rollback
    await queryInterface.removeColumn('tags', 'postId');

    // Recreate the PostTag junction table if needed during rollback
    await queryInterface.createTable('PostTag', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'posts',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      tagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tags',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  }
};
