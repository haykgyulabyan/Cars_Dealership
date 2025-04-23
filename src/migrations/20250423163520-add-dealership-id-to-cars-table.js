'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'cars',
      'dealership_id',
      {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'dealerships',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        after: 'model_id',
      },
    );
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(
      'cars',
      'dealership_id',
    );
  },
};
