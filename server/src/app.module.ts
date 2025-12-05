import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { BlogPostsModule } from './blog-posts/blog-posts.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    DashboardModule,
    BlogPostsModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
