export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  joinDate: string;
  lastLogin: string;
  preferences: {
    theme: string;
    notifications: boolean;
    language: string;
  };
}

export interface DashboardData {
  stats: {
    totalOrders: number;
    revenue: string;
    activeSubscriptions: number;
    supportTickets: number;
  };
  recentActivity: Array<{
    id: number;
    type: string;
    message: string;
    time: string;
    status: string;
  }>;
  notifications: Array<{
    id: number;
    title: string;
    message: string;
    type: string;
    unread: boolean;
  }>;
  currentTime: string;
  serverLocation: string;
}