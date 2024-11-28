import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entity/cart.entity';
import { Product } from 'src/products/entity/product.entity';
import { CartService } from './service/cart.service';
import { CartController } from './controller/cart.controller';
import { MailerConfigModule } from '../mail/mailer.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, Product]),
    MailerConfigModule,],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule { }
