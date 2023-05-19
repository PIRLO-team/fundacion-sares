import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtMiddleware } from '../../auth/middleware/jwt.middleware';

@Controller()
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @UseGuards(JwtMiddleware)
  async findDataDashboard() {
    const { response, title, message, status } =
      await this.dashboardService.findDataDashboard();

    throw new HttpException({ response, title, message }, status);
  }
}
