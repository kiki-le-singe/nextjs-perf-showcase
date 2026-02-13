import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Header,
} from '@nestjs/common';
import { BlogPostsService } from './blog-posts.service';
import { BlogPostsSchema, safeParse } from '@shared/schemas';

@Controller('blog-posts')
export class BlogPostsController {
  constructor(private readonly blogPostsService: BlogPostsService) {}

  @Get()
  @Header('Cache-Control', 'public, max-age=31536000, immutable')
  async getBlogPosts() {
    try {
      const blogPosts = await this.blogPostsService.getBlogPosts();

      const validation = safeParse(BlogPostsSchema, blogPosts);

      if (!validation.success) {
        throw new HttpException(
          {
            error: 'Validation Error',
            message: 'Blog posts data failed validation',
            details: validation.error,
            timestamp: new Date().toISOString(),
            success: false,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return validation.data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        {
          error: 'Internal Server Error',
          message: 'Failed to fetch blog posts data',
          timestamp: new Date().toISOString(),
          success: false,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
