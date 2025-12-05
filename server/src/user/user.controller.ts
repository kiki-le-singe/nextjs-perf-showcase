import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSchema, safeParse } from '@shared/schemas';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    try {
      const rawUser = await this.userService.getUser();

      const validation = safeParse(UserSchema, rawUser);

      if (!validation.success) {
        throw new HttpException(
          {
            error: 'Validation Error',
            message: 'User data failed validation',
            details: validation.error,
            timestamp: new Date().toISOString(),
            success: false,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return validation.data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          error: 'Internal Server Error',
          message: 'Failed to fetch user data',
          timestamp: new Date().toISOString(),
          success: false,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
