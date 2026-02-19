import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';
import { PrismaService } from '../prisma/prisma.service';

// ---------------------------------------------------------------------------
// Fixtures — Prisma model shapes (include Date objects, extra fields, etc.)
// ---------------------------------------------------------------------------

const mockActivities = [
  {
    id: 1,
    type: 'order',
    message: 'New order placed',
    time: new Date('2024-01-15T10:30:00.000Z'), // Prisma returns a Date
    status: 'success',
  },
  {
    id: 2,
    type: 'payment',
    message: 'Payment received',
    time: new Date('2024-01-15T09:00:00.000Z'),
    status: 'success',
  },
];

const mockNotifications = [
  {
    id: 1,
    title: 'System Alert',
    message: 'Scheduled maintenance tonight',
    type: 'info',
    unread: true,
    createdAt: new Date(), // Prisma field — must NOT appear in the output
  },
];

// ---------------------------------------------------------------------------
// Suite
// ---------------------------------------------------------------------------

describe('DashboardService', () => {
  let service: DashboardService;
  let mockActivityFindMany: jest.Mock;
  let mockNotificationFindMany: jest.Mock;

  beforeEach(async () => {
    mockActivityFindMany = jest.fn().mockResolvedValue(mockActivities);
    mockNotificationFindMany = jest.fn().mockResolvedValue(mockNotifications);

    const mockPrisma = {
      activity: { findMany: mockActivityFindMany },
      notification: { findMany: mockNotificationFindMany },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DashboardService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  describe('getDashboard() — activity mapping', () => {
    it('converts activity.time (Date) to an ISO string', async () => {
      const result = await service.getDashboard();

      expect(result.recentActivity[0].time).toBe('2024-01-15T10:30:00.000Z');
      expect(result.recentActivity[1].time).toBe('2024-01-15T09:00:00.000Z');
    });

    it('maps all activity fields correctly', async () => {
      const result = await service.getDashboard();

      expect(result.recentActivity[0]).toMatchObject({
        id: 1,
        type: 'order',
        message: 'New order placed',
        status: 'success',
      });
    });
  });

  describe('getDashboard() — notification mapping', () => {
    it('maps notification fields correctly', async () => {
      const result = await service.getDashboard();

      expect(result.notifications[0]).toMatchObject({
        id: 1,
        title: 'System Alert',
        message: 'Scheduled maintenance tonight',
        type: 'info',
        unread: true,
      });
    });

    it('does not expose the Prisma createdAt field in the output', async () => {
      const result = await service.getDashboard();

      expect(result.notifications[0]).not.toHaveProperty('createdAt');
    });
  });

  describe('getDashboard() — stats and metadata', () => {
    it('returns stats with all required fields in the correct format', async () => {
      const result = await service.getDashboard();

      expect(result.stats).toMatchObject({
        totalOrders: expect.any(Number),
        // revenue is a string with exactly 2 decimal places (matches StatsSchema regex)
        revenue: expect.stringMatching(/^\d+\.\d{2}$/),
        activeSubscriptions: expect.any(Number),
        supportTickets: expect.any(Number),
      });
    });

    it('returns a valid ISO datetime string for currentTime', async () => {
      const result = await service.getDashboard();

      // A valid ISO string round-trips through Date without loss
      expect(new Date(result.currentTime).toISOString()).toBe(result.currentTime);
    });

    it('sets serverLocation to "US-East-1"', async () => {
      const result = await service.getDashboard();

      expect(result.serverLocation).toBe('US-East-1');
    });
  });
});
