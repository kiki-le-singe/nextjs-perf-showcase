import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  private generateRandomStats() {
    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const randomMoney = (min: number, max: number) =>
      (Math.random() * (max - min) + min).toFixed(2);

    return {
      totalOrders: randomInt(1100, 1350), // baseline: 1234
      revenue: randomMoney(42000, 52000), // baseline: 45678.90
      activeSubscriptions: randomInt(800, 950), // baseline: 892
      supportTickets: randomInt(10, 40), // baseline: 23
    };
  }

  async getDashboard() {
    const now = new Date();

    // Fetch stats from database
    // const stats = await this.prisma.dashboardStats.findFirst({
    //   orderBy: { createdAt: 'desc' },
    // });
    // Generate random stats for demo so cache modes show different results.
    const stats = this.generateRandomStats();

    // Fetch recent activities from database
    const activities = await this.prisma.activity.findMany({
      take: 10,
      orderBy: { time: 'desc' },
    });

    // Fetch notifications from database
    const notifications = await this.prisma.notification.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    });

    return {
      stats: stats
        ? {
            totalOrders: stats.totalOrders,
            revenue: stats.revenue,
            activeSubscriptions: stats.activeSubscriptions,
            supportTickets: stats.supportTickets,
          }
        : {
            totalOrders: 0,
            revenue: '0.00',
            activeSubscriptions: 0,
            supportTickets: 0,
          },
      recentActivity: activities.map((activity) => ({
        id: activity.id,
        type: activity.type,
        message: activity.message,
        time: activity.time.toISOString(),
        status: activity.status,
      })),
      notifications: notifications.map((notification) => ({
        id: notification.id,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        unread: notification.unread,
      })),
      currentTime: now.toISOString(),
      serverLocation: 'US-East-1',
    };
  }
}
