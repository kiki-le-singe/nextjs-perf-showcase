import { NextRequest, NextResponse } from 'next/server';
import { DashboardSchema, ApiErrorSchema, safeParse } from '@/lib/schemas';

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay for realistic demo
    await new Promise(resolve => setTimeout(resolve, 150));
    
    const now = new Date();
    
    const rawDashboardData = {
      stats: {
        totalOrders: Math.floor(Math.random() * 100) + 50,
        revenue: (Math.random() * 5000 + 2000).toFixed(2),
        activeSubscriptions: Math.floor(Math.random() * 20) + 5,
        supportTickets: Math.floor(Math.random() * 10) + 1
      },
      recentActivity: [
        {
          id: 1,
          type: "order" as const,
          message: "New order #12847 received",
          time: new Date(now.getTime() - Math.random() * 3600000).toISOString(),
          status: "success" as const
        },
        {
          id: 2,
          type: "payment" as const,
          message: "Payment of $99.99 processed",
          time: new Date(now.getTime() - Math.random() * 3600000).toISOString(),
          status: "success" as const
        },
        {
          id: 3,
          type: "support" as const,
          message: "Support ticket #456 updated",
          time: new Date(now.getTime() - Math.random() * 3600000).toISOString(),
          status: "pending" as const
        },
        {
          id: 4,
          type: "notification" as const,
          message: "System maintenance scheduled",
          time: new Date(now.getTime() - Math.random() * 3600000).toISOString(),
          status: "info" as const
        }
      ],
      notifications: [
        {
          id: 1,
          title: "Welcome back!",
          message: "You have 3 new messages waiting",
          type: "info" as const,
          unread: true
        },
        {
          id: 2,
          title: "Security Alert",
          message: "New login from Chrome on Windows",
          type: "warning" as const,
          unread: true
        },
        {
          id: 3,
          title: "Subscription Reminder",
          message: "Your premium subscription expires in 7 days",
          type: "info" as const,
          unread: false
        }
      ],
      currentTime: now.toISOString(),
      serverLocation: "US-East-1"
    };

    const validation = safeParse(DashboardSchema, rawDashboardData);
    
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation Error',
          message: 'Dashboard data failed validation',
          details: validation.error,
          timestamp: new Date().toISOString(),
          success: false
        } satisfies Parameters<typeof ApiErrorSchema.parse>[0],
        { status: 500 }
      );
    }

    return NextResponse.json(validation.data, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Internal Server Error',
        message: 'Failed to fetch dashboard data',
        timestamp: new Date().toISOString(),
        success: false
      } satisfies Parameters<typeof ApiErrorSchema.parse>[0],
      { status: 500 }
    );
  }
}