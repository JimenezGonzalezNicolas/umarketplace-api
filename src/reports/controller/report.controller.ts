import { Body, Controller, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import { ReportService } from '../service/report.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async createReport(
    @Req() request: any,
    @Body() reportData: { productId: number; reason: string; description?: string },
  ) {
    return this.reportService.createReport(
      request.user.userId,
      reportData.productId,
      reportData.reason,
      reportData.description,
    );
  }

  @Get(':id')
  async getReport(@Param('id') id: number) {
    return this.reportService.getReport(id);
  }

  @Get()
  async getAllReports() {
    return this.reportService.getAllReports();
  }
}
