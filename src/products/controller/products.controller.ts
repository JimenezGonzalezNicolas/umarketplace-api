import { Controller, Get, Post, Put, Delete, Patch, Param, Body, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from '../service/products.service';
import { Product } from '../entity/product.entity';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard'; // Ruta correcta según tu proyecto

@UseGuards(JwtAuthGuard) // Proteger todo el controlador
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get('active')
  async getActiveProducts(): Promise<Product[]> {
    return await this.productsService.findActiveProducts();
  }

  @Get('student')
  async getProductsByStudent(@Req() request: any): Promise<Product[]> {
      const studentId = request.user.userId; 
      return await this.productsService.findByStudentId(studentId);
  }
  
  @Post()
  async createProduct(@Body() productData: Partial<Product>): Promise<Product> {
    const { studentId } = productData;
    return this.productsService.create({ ...productData, studentId });
  }
  
  @Get('student/:studentId')
  async getProductsByStudentId(@Param('studentId') studentId: number): Promise<Product[]> {
    return await this.productsService.findByStudentId(studentId);
  }

  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() productData: Partial<Product>): Promise<Product> {
    return await this.productsService.update(id, productData);
  }

  @Patch(':id/deactivate')
  async deactivateProduct(@Param('id') id: number): Promise<void> {
    return await this.productsService.deactivateProduct(id);
  }

  @Patch(':id/activate')
  async activateProduct(@Param('id') id: number): Promise<void> {
    return await this.productsService.activateProduct(id);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number): Promise<void> {
    return await this.productsService.delete(id);
  }

  @Get('campus/:campus')
  async getProductsByCampus(@Param('campus') campus: string): Promise<Product[]> {
    return await this.productsService.findByCampus(campus);
  }  

}
