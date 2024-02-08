'use strict';

module.exports = {
  up: async (queryInterface) => {
    const usersData = [
      { name: 'adminUser' },
      { name: 'editorUser' },
      { name: 'viewerUser' },
      { name: 'creatorUser' },
    ];
    await queryInterface.bulkInsert('Users', usersData, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
