import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { User } from './user.model';
import { UserRole } from './user-role.model';
import { Permission } from './permission.model';
import { RolePermission } from './role-permission.model';

@Table
export class Role extends Model {
  @Column
  name!: string;

  @BelongsToMany(() => User, () => UserRole)
  users!: User[];

  @BelongsToMany(() => Permission, () => RolePermission)
  permissions!: Permission[];
}
