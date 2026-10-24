'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint('businesses', {
      fields: ['osmType', 'osmId'],
      type: 'unique',
      name: 'businesses_osm_type_osm_id_unique',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      'businesses',
      'businesses_osm_type_osm_id_unique'
    );
  },
};

