import { NotFoundException } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../User/user.service';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';
import { Permission } from '../../models/permission.model';
import { UserRole } from '../../models/user-role.model';
import { RolePermission } from '../../models/role-permission.model';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUserPermissions', () => {
    it('should return user permissions', async () => {
      const mockUserId = 1;
      const mockUser = new User();
      const mockRole = new Role();
      mockRole.id = 3;
      mockRole.permissions = [
        new Permission({ id: 1, name: 'read' }),
        new Permission({ id: 2, name: 'write' }),
      ];
      mockUser.id = mockUserId;
      mockUser.roles = [mockRole];

      jest.spyOn(service['userModel'], 'findByPk').mockResolvedValue(mockUser);

      const result = await service.getUserPermissions(mockUserId);

      expect(result).toEqual(['read', 'write']);
    });

    it('should throw NotFoundException for non-existing user', async () => {
      const nonExistingUserId = 99;
      jest.spyOn(service['userModel'], 'findByPk').mockResolvedValueOnce(null);

      await expect(
        service.getUserPermissions(nonExistingUserId),
      ).rejects.toThrowError(
        new NotFoundException(`User with ID ${nonExistingUserId} not found`),
      );
    });
  });
});
