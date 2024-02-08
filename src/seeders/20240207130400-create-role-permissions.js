'use strict';

module.exports = {
  up: async (queryInterface) => {
    const rolePermissionsData = [
      { roleId: 1, permissionId: 1 }, //ADMIN
      { roleId: 1, permissionId: 2 },
      { roleId: 1, permissionId: 3 },
      { roleId: 1, permissionId: 4 },
      { roleId: 2, permissionId: 2 }, //EDITOR
      { roleId: 3, permissionId: 3 }, //VIEWER
      { roleId: 4, permissionId: 1 }, //CREATOR
    ];

    await queryInterface.bulkInsert('RolePermissions', rolePermissionsData, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('RolePermissions', null, {});
  },
};
