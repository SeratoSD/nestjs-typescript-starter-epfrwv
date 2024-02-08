import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Role) private readonly roleModel: typeof Role,
  ) {}

  async getUserPermissions(userId: number): Promise<string[]> {
    const user = await this.userModel.findByPk(userId, {
      include: [{ model: Role, attributes: ['id'], include: ['permissions'] }],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const permissions = user.roles.flatMap((role) =>
      role.permissions
        ? role.permissions.map((permission) => permission.name)
        : [],
    );
    return permissions;
  }
}
