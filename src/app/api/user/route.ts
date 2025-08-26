import { NextRequest, NextResponse } from 'next/server';
import { UserSchema, ApiErrorSchema, safeParse } from '@/lib/schemas';

export async function GET(request: NextRequest) {
  try {
    // Simulate API delay for realistic demo
    await new Promise(resolve => setTimeout(resolve, 50));

    const rawUser = {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "/next.svg",
      role: "Premium User" as const,
      joinDate: "2023-03-15",
      lastLogin: new Date().toISOString(),
      preferences: {
        theme: "light" as const,
        notifications: true,
        language: "en"
      }
    };

    const validation = safeParse(UserSchema, rawUser);
    
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation Error',
          message: 'User data failed validation',
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
        message: 'Failed to fetch user data',
        timestamp: new Date().toISOString(),
        success: false
      } satisfies Parameters<typeof ApiErrorSchema.parse>[0],
      { status: 500 }
    );
  }
}