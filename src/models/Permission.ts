// models/Permission.ts

import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/database';
import Role from './Role';

interface PermissionAttributes {
  id: number;
  name: string;
  roleId: number;
}

interface PermissionCreationAttributes
  extends Optional<PermissionAttributes, 'id'> {}

class Permission
  extends Model<PermissionAttributes, PermissionCreationAttributes>
  implements PermissionAttributes
{
  public id!: number;
  public name!: string;
  public roleId!: number;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Permission.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER.UNSIGNED,
      references: {
        model: Role,
        key: 'id',
      },
      allowNull: false,
    },
  },
  {
    tableName: 'permissions',
    sequelize,
  },
);

export default Permission;
