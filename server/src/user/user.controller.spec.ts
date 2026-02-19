import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const validUser = {
  id: 1,
  name: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  avatar: '/next.svg',
  role: 'Premium User' as const,
  joinDate: '2023-03-15',
  lastLogin: '2024-01-15T10:30:00.000Z',
  preferences: {
    theme: 'light' as const,
    notifications: true,
    language: 'en',
  },
};

describe('UserController', () => {
  let controller: UserController;
  let mockGetUser: jest.Mock;

  beforeEach(async () => {
    mockGetUser = jest.fn();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: { getUser: mockGetUser } }],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  describe('getUser()', () => {
    it('returns validated user data when the service returns valid data', async () => {
      mockGetUser.mockResolvedValue(validUser);

      const result = await controller.getUser();

      expect(result).toMatchObject({
        id: 1,
        name: 'Sarah Johnson',
        email: 'sarah.johnson@example.com',
      });
    });

    it('throws a 500 Validation Error when service data fails the schema', async () => {
      // id must be positive, email must be valid — this will fail UserSchema
      mockGetUser.mockResolvedValue({ id: -1, name: '', email: 'bad-email' });

      const err = await controller.getUser().catch((e) => e);

      expect(err).toBeInstanceOf(HttpException);
      expect(err.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(err.getResponse()).toMatchObject({
        error: 'Validation Error',
        success: false,
      });
    });

    it('re-throws an HttpException from the service unchanged', async () => {
      const original = new HttpException(
        {
          error: 'Not Found',
          message: 'Resource not found',
          timestamp: new Date().toISOString(),
          success: false,
        },
        HttpStatus.NOT_FOUND,
      );
      mockGetUser.mockRejectedValue(original);

      const err = await controller.getUser().catch((e) => e);

      expect(err).toBe(original);
      expect(err.getStatus()).toBe(HttpStatus.NOT_FOUND);
    });

    it('wraps a generic Error from the service in a 500 Internal Server Error', async () => {
      mockGetUser.mockRejectedValue(new Error('DB connection failed'));

      const err = await controller.getUser().catch((e) => e);

      expect(err).toBeInstanceOf(HttpException);
      expect(err.getStatus()).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(err.getResponse()).toMatchObject({
        error: 'Internal Server Error',
        success: false,
      });
    });
  });
});
