import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data in correct order (respecting foreign keys)
  await prisma.activity.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.product.deleteMany();
  await prisma.dashboardStats.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Cleared existing data');

  // Seed Users
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'Admin',
      joinDate: new Date('2023-01-15'),
      lastLogin: new Date('2025-10-09'),
      preferences: {
        theme: 'dark',
        notifications: true,
        language: 'en',
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'Premium User',
      joinDate: new Date('2023-06-20'),
      lastLogin: new Date('2025-10-10'),
      preferences: {
        theme: 'light',
        notifications: false,
        language: 'fr',
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      avatar: 'https://i.pravatar.cc/150?img=12',
      role: 'Basic User',
      joinDate: new Date('2024-02-10'),
      lastLogin: new Date('2025-10-08'),
      preferences: {
        theme: 'dark',
        notifications: true,
        language: 'en',
      },
    },
  });

  console.log('✅ Created 3 users');

  // Seed Dashboard Stats
  await prisma.dashboardStats.create({
    data: {
      totalOrders: 1234,
      revenue: '45678.90',
      activeSubscriptions: 892,
      supportTickets: 23,
    },
  });

  console.log('✅ Created dashboard stats');

  // Seed Activities
  await prisma.activity.createMany({
    data: [
      {
        type: 'order',
        message: 'New order #1234 received',
        time: new Date('2025-10-10T10:30:00'),
        status: 'success',
        userId: user1.id,
      },
      {
        type: 'payment',
        message: 'Payment processed for order #1233',
        time: new Date('2025-10-10T09:15:00'),
        status: 'success',
        userId: user2.id,
      },
      {
        type: 'support',
        message: 'New support ticket #456',
        time: new Date('2025-10-10T08:45:00'),
        status: 'pending',
        userId: user3.id,
      },
      {
        type: 'notification',
        message: 'System update scheduled',
        time: new Date('2025-10-09T18:00:00'),
        status: 'info',
        userId: null, // Global activity
      },
      {
        type: 'system',
        message: 'Database backup completed',
        time: new Date('2025-10-09T02:00:00'),
        status: 'success',
        userId: null, // Global activity
      },
      {
        type: 'order',
        message: 'Order #1232 cancelled',
        time: new Date('2025-10-08T16:20:00'),
        status: 'warning',
        userId: user1.id,
      },
      {
        type: 'payment',
        message: 'Payment failed for order #1231',
        time: new Date('2025-10-08T14:10:00'),
        status: 'error',
        userId: user2.id,
      },
    ],
  });

  console.log('✅ Created 7 activities');

  // Seed Notifications
  await prisma.notification.createMany({
    data: [
      {
        title: 'Welcome!',
        message: 'Welcome to your dashboard. Start exploring!',
        type: 'success',
        unread: true,
        userId: user1.id,
      },
      {
        title: 'New Feature Available',
        message: 'Check out our new analytics dashboard',
        type: 'info',
        unread: true,
        userId: user1.id,
      },
      {
        title: 'Action Required',
        message: 'Please update your payment method',
        type: 'warning',
        unread: false,
        userId: user2.id,
      },
      {
        title: 'System Maintenance',
        message: 'Scheduled maintenance on Sunday 2AM-4AM',
        type: 'info',
        unread: false,
        userId: null, // Global notification
      },
      {
        title: 'Security Alert',
        message: 'New login detected from unknown device',
        type: 'error',
        unread: true,
        userId: user3.id,
      },
    ],
  });

  console.log('✅ Created 5 notifications');

  // Seed Products
  await prisma.product.createMany({
    data: [
      {
        name: 'Wireless Bluetooth Headphones',
        price: 79.99,
        originalPrice: 99.99,
        rating: 4.5,
        reviews: 1247,
        image: '/next.svg',
        category: 'Electronics',
        inStock: true,
        discount: 20,
        description:
          'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
        stockLevel: 45,
        lastUpdated: new Date(),
      },
      {
        name: 'Smart Fitness Watch',
        price: 199.99,
        originalPrice: 249.99,
        rating: 4.7,
        reviews: 892,
        image: '/next.svg',
        category: 'Wearables',
        inStock: true,
        discount: 20,
        description:
          'Track your health and fitness with advanced sensors and GPS functionality.',
        stockLevel: 23,
        lastUpdated: new Date(),
      },
      {
        name: 'Mechanical Gaming Keyboard',
        price: 129.99,
        originalPrice: 159.99,
        rating: 4.8,
        reviews: 2156,
        image: '/next.svg',
        category: 'Gaming',
        inStock: false,
        discount: 19,
        description:
          'RGB backlit mechanical keyboard with customizable switches and macro support.',
        stockLevel: 0,
        lastUpdated: new Date(),
      },
      {
        name: '4K Webcam',
        price: 89.99,
        originalPrice: 119.99,
        rating: 4.3,
        reviews: 567,
        image: '/next.svg',
        category: 'Electronics',
        inStock: true,
        discount: 25,
        description:
          'Ultra HD webcam perfect for streaming, video calls, and content creation.',
        stockLevel: 78,
        lastUpdated: new Date(),
      },
      {
        name: 'Portable Power Bank',
        price: 34.99,
        originalPrice: 49.99,
        rating: 4.6,
        reviews: 1834,
        image: '/next.svg',
        category: 'Accessories',
        inStock: true,
        discount: 30,
        description:
          '20,000mAh portable charger with fast charging and multiple device support.',
        stockLevel: 156,
        lastUpdated: new Date(),
      },
      {
        name: 'Wireless Mouse',
        price: 24.99,
        originalPrice: 34.99,
        rating: 4.2,
        reviews: 743,
        image: '/next.svg',
        category: 'Electronics',
        inStock: true,
        discount: 29,
        description:
          'Ergonomic wireless mouse with precision tracking and long battery life.',
        stockLevel: 92,
        lastUpdated: new Date(),
      },
    ],
  });

  console.log('✅ Created 6 products');

  // Seed Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Getting Started with Next.js 15',
        excerpt:
          'Learn the fundamentals of Next.js 15 and its new features including the App Router and Server Components.',
        author: 'Jane Doe',
        date: new Date('2024-01-15'),
        readTime: '5 min read',
        category: 'Tutorial',
        tags: ['Next.js', 'React', 'Web Development'],
        userId: user2.id,
      },
      {
        title: 'Static Site Generation vs Server-Side Rendering',
        excerpt:
          'Understand the differences between SSG and SSR, and when to use each rendering method in your applications.',
        author: 'John Smith',
        date: new Date('2024-01-10'),
        readTime: '8 min read',
        category: 'Performance',
        tags: ['SSG', 'SSR', 'Performance'],
        userId: user1.id,
      },
      {
        title: 'Building Fast Websites with Static Generation',
        excerpt:
          "Discover how static site generation can dramatically improve your website's performance and user experience.",
        author: 'Alice Johnson',
        date: new Date('2024-01-05'),
        readTime: '6 min read',
        category: 'Performance',
        tags: ['Static', 'Performance', 'Optimization'],
        userId: null, // Guest author
      },
      {
        title: 'SEO Best Practices for Static Sites',
        excerpt:
          'Learn how to optimize your statically generated sites for search engines and improve your rankings.',
        author: 'Bob Wilson',
        date: new Date('2024-01-01'),
        readTime: '7 min read',
        category: 'SEO',
        tags: ['SEO', 'Static Sites', 'Marketing'],
        userId: user3.id,
      },
    ],
  });

  console.log('✅ Created 4 blog posts');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
