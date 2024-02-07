// models/UserRole.ts

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import User from './User';
import Role from './Role';

interface UserRoleAttributes {
  userId: number;
  roleId: number;
}

interface UserRoleCreationAttributes
  extends Optional<UserRoleAttributes, 'roleId'> {}

class UserRole
  extends Model<UserRoleAttributes, UserRoleCreationAttributes>
  implements UserRoleAttributes
{
  public userId!: number;
  public roleId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserRole.init(
  {
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      references: {
        model: Role,
        key: 'id',
      },
    },
  },
  {
    tableName: 'user_roles',
    sequelize,
  },
);

export default UserRole;
