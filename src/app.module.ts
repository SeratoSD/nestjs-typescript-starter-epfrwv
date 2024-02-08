import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './User/user.controller';
import { UserService } from './User/user.service';
import { User } from './models/user.model';
import { Role } from './models/role.model';
import { UserRole } from './models/user-role.model';
import { Permission } from './models/permission.model';
import { RolePermission } from './models/role-permission.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      database: 'database_development',
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: 'ultraSecret',
      models: [User, Role, UserRole, Permission, RolePermission],
      define: {
        timestamps: false,
      },
    }),
    SequelizeModule.forFeature([
      User,
      Role,
      UserRole,
      Permission,
      RolePermission,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
