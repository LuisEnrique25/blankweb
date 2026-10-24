'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('leads', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      businessId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'businesses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      status: {
        type: Sequelize.ENUM(
          'new',
          'contacted',
          'interested',
          'converted',
          'rejected'
        ),
        allowNull: false,
        defaultValue: 'new',
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint('leads', {
      fields: ['userId', 'businessId'],
      type: 'unique',
      name: 'leads_user_id_business_id_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('leads');
  },
};
