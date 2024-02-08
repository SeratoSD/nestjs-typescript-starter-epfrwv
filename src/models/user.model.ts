import { Table, Column, Model, BelongsToMany } from 'sequelize-typescript';
import { Role } from './role.model';
import { UserRole } from './user-role.model';

@Table
export class User extends Model {
  @Column
  name!: string;

  @BelongsToMany(() => Role, () => UserRole)
  roles!: Role[];
}
