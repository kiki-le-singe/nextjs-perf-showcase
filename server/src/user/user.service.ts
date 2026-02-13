import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser() {
    // Simulate API delay for realistic demo
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Return mock data (later we'll fetch from DB)
    return {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: '/next.svg',
      role: 'Premium User' as const,
      joinDate: '2023-03-15',
      lastLogin: new Date().toISOString(),
      preferences: {
        theme: 'light' as const,
        notifications: true,
        language: 'en',
      },
    };
  }
}
