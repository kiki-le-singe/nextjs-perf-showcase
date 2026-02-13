import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardSchema, safeParse } from '@shared/schemas';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboard() {
    try {
      const rawDashboardData = await this.dashboardService.getDashboard();

      const validation = safeParse(DashboardSchema, rawDashboardData);

      if (!validation.success) {
        throw new HttpException(
          {
            error: 'Validation Error',
            message: 'Dashboard data failed validation',
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
          message: 'Failed to fetch dashboard data',
          timestamp: new Date().toISOString(),
          success: false,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
