import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId/permissions')
  async getUserPermissions(@Param('userId') userId: string): Promise<string[]> {
    const parsedUserId = parseInt(userId, 10);
    const permissions = await this.userService.getUserPermissions(parsedUserId);

    return permissions;
  }
}
