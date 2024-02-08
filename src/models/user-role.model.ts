import { Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './user.model';
import { Role } from './role.model';

@Table
export class UserRole extends Model {
  @ForeignKey(() => User)
  @BelongsTo(() => User, { as: 'userAssociation' })
  userId!: User;

  @ForeignKey(() => Role)
  @BelongsTo(() => Role, { as: 'roleAssociation' })
  roleId!: Role;
}
