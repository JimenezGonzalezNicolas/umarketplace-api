import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findByStudentId(studentId: number): Promise<Product[]> {
    return await this.productRepository.find({ where: { studentId } });
  }

  async findActiveProducts(): Promise<Product[]> {
    return await this.productRepository.find({ where: { status: true } });
  }

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return await this.productRepository.save(product);
  }

  async update(id: number, productData: Partial<Product>): Promise<Product> {
    await this.productRepository.update(id, productData);
    return this.productRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  async deactivateProduct(id: number): Promise<void> {
    await this.productRepository.update(id, { status: false });
  }

  async activateProduct(id: number): Promise<void> {
    await this.productRepository.update(id, { status: true });
  }

  async findByCampus(campus: string): Promise<Product[]> {
    return this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.student', 'student') // Relación con estudiantes
      .where('student.campus = :campus', { campus }) // Filtrar por campus
      .andWhere('product.status = true') // Solo productos activos
      .select([
        'product.id',
        'product.name',
        'product.description',
        'product.price',
        'product.stock',
        'product.status',
        'product.createdAt',
        'product.updatedAt',
        'student.id',
        'student.name',
        'student.email',
        'student.career',
        'student.campus',
        'student.phone',
      ])
      .getMany();
  }
  
  
}
