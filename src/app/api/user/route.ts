import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Simulate API delay for realistic demo
  await new Promise(resolve => setTimeout(resolve, 50));

  const user = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/next.svg",
    role: "Premium User",
    joinDate: "2023-03-15",
    lastLogin: new Date().toISOString(),
    preferences: {
      theme: "light",
      notifications: true,
      language: "en"
    }
  };

  return NextResponse.json(user, {
    headers: {
      'Cache-Control': 'no-store, must-revalidate',
    },
  });
}