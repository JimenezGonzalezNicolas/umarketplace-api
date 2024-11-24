import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './service/products.service';
import { ProductsController } from './controller/products.controller';
import { Product } from './entity/product.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/students/guard/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    JwtModule.register({
      secret: 'super-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, JwtStrategy], 
})
export class ProductsModule {}
