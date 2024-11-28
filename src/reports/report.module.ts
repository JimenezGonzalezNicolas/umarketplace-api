import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportService } from './service/report.service';
import { ReportController } from './controller/report.controller';
import { Report } from './entity/report.entity';
import { Product } from '../products/entity/product.entity';
import { Student } from '../students/entity/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report, Product, Student])],
  controllers: [ReportController],
  providers: [ReportService],
  exports: [ReportService],
})
export class ReportModule {}
