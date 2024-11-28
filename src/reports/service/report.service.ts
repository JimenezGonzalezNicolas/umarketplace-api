import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entity/report.entity';
import { Product } from 'src/products/entity/product.entity';
import { Student } from 'src/students/entity/student.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private readonly reportRepository: Repository<Report>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async createReport(reporterId: number, productId: number, reason: string, description?: string) {
    const reporter = await this.studentRepository.findOne({ where: { id: reporterId } });
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!reporter || !product) {
      throw new Error('Usuario o producto no encontrado');
    }

    const newReport = this.reportRepository.create({
      reporter,
      product,
      reason,
      description,
    });

    return this.reportRepository.save(newReport);
  }

  async getReport(id: number) {
    return this.reportRepository.findOne({
      where: { id },
      relations: ['reporter', 'product'],
    });
  }

  async getAllReports() {
    return this.reportRepository.find({ relations: ['reporter', 'product'] });
  }
}
