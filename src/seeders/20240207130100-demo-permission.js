'use strict';

module.exports = {
  up: async (queryInterface) => {
    const permissionsData = [
      { name: 'create' },
      { name: 'update' },
      { name: 'read' },
      { name: 'delete' },
    ];

    await queryInterface.bulkInsert('Permissions', permissionsData, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Permissions', null, {});
  },
};
