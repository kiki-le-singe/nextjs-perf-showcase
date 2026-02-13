import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Header,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsSchema, safeParse } from '@shared/schemas';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @Header('Cache-Control', 's-maxage=60, stale-while-revalidate=120')
  async getProducts() {
    try {
      const products = await this.productsService.getProducts();

      const validation = safeParse(ProductsSchema, products);

      if (!validation.success) {
        throw new HttpException(
          {
            error: 'Validation Error',
            message: 'Products data failed validation',
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
          message: 'Failed to fetch products data',
          timestamp: new Date().toISOString(),
          success: false,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
