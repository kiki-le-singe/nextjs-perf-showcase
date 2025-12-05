import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async getProducts() {
    // Simulate API delay for realistic demo
    await new Promise((resolve) => setTimeout(resolve, 200));

    // Fetch products from database
    const products = await this.prisma.product.findMany({
      orderBy: { id: 'asc' },
    });

    // Add dynamic data for ISR demo - make changes VERY visible
    return products.map((product) => ({
      ...product,
      // Randomly change stock levels dramatically (0-200)
      stockLevel: Math.floor(Math.random() * 200),
      // Randomly set inStock based on stock level
      inStock: Math.random() > 0.3, // 70% chance of being in stock
      // Vary prices slightly (±10%)
      price: Number((product.price * (0.9 + Math.random() * 0.2)).toFixed(2)),
      // Vary discount (0-40%)
      discount: Math.floor(Math.random() * 40),
      // Update timestamp to show when data was fetched
      lastUpdated: new Date().toISOString(),
      // Add a data version for easier tracking
      dataVersion: Math.floor(Date.now() / 1000), // Unix timestamp in seconds
    }));
  }
}
