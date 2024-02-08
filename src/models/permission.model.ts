import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { Role } from './role.model';
import { RolePermission } from './role-permission.model';

@Table
export class Permission extends Model {
  @Column
  name!: string;

  @BelongsToMany(() => Role, () => RolePermission)
  roles!: Role[];
}
