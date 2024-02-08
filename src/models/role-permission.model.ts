// role-permission.model.ts

import { Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Role } from './role.model';
import { Permission } from './permission.model';

@Table
export class RolePermission extends Model {
  @ForeignKey(() => Role)
  @BelongsTo(() => Role, { as: 'roleAssociation' })
  roleId!: Role;

  @ForeignKey(() => Permission)
  @BelongsTo(() => Permission, { as: 'permissionAssociation' })
  permissionId!: Permission;
}
