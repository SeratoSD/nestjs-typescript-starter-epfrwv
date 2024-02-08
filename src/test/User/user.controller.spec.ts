import { Test, TestingModule } from '@nestjs/testing';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from '../../User/user.controller';
import { UserService } from '../../User/user.service';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';
import { UserRole } from '../../models/user-role.model';
import { Permission } from '../../models/permission.model';
import { RolePermission } from '../../models/role-permission.model';

describe('AppController', () => {
  let app: TestingModule;
  let userService: UserService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
      imports: [
        SequelizeModule.forRoot({
          database: 'test',
          dialect: 'postgres',
          host: 'test',
          port: 5432,
          username: 'test',
          password: 'test',
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
    }).compile();

    userService = app.get<UserService>(UserService);
  });

  describe('getUserPermissions', () => {
    it('should return permissions for the admin user (id=1)', async () => {
      const expectedPermissions = ['create', 'update', 'read', 'delete'];
      const userController = app.get(UserController);

      jest
        .spyOn(userService, 'getUserPermissions')
        .mockResolvedValue(['create', 'update', 'read', 'delete']);

      expect(await userController.getUserPermissions('1')).toEqual(
        expectedPermissions,
      );
    });
  });

  it('should return user not found (id=5)', async () => {
    const userController = app.get(UserController);
    jest
      .spyOn(userService, 'getUserPermissions')
      .mockRejectedValue(new Error('User not found'));

    await expect(userController.getUserPermissions('5')).rejects.toThrow(
      'User not found',
    );
  });
});
