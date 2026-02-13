import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogPostsService {
  constructor(private prisma: PrismaService) {}

  async getBlogPosts() {
    // Simulate API delay for realistic demo
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Fetch blog posts from database
    const blogPosts = await this.prisma.blogPost.findMany({
      orderBy: { date: 'desc' },
    });

    // Transform to match expected format
    return blogPosts.map((post) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      author: post.author,
      date: post.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
      readTime: post.readTime,
      category: post.category,
      tags: post.tags,
    }));
  }
}
