'use strict';

module.exports = {
  up: async (queryInterface) => {
    const rolesData = [
      { name: 'ADMIN' },
      { name: 'EDITOR' },
      { name: 'VIEWER' },
      { name: 'CREATOR' },
    ];

    await queryInterface.bulkInsert('Roles', rolesData, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
