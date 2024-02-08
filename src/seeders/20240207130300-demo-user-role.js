'use strict';

module.exports = {
  up: async (queryInterface) => {
    const userRolesData = [
      { userId: 1, roleId: 1 }, // adminUser
      { userId: 2, roleId: 2 }, // editorUser
      { userId: 3, roleId: 3 }, // viewerUser
      { userId: 4, roleId: 4 }, // creatorUser
    ];

    await queryInterface.bulkInsert('UserRoles', userRolesData, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('UserRoles', null, {});
  },
};
