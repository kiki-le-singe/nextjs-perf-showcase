import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProducts() {
    // Simulate API delay for realistic demo
    await new Promise(resolve => setTimeout(resolve, 200));

    // Fetch products from database
    const products = await this.prisma.product.findMany({
      orderBy: { id: 'asc' },
    });

    // Add dynamic data for ISR demo
    return products.map(product => ({
      ...product,
      // Update stock level dynamically to show ISR in action
      stockLevel: product.stockLevel ? product.stockLevel + Math.floor(Math.random() * 10) : Math.floor(Math.random() * 100) + 1,
      // Update timestamp
      lastUpdated: new Date().toISOString(),
    }));
  }
}
