import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from '../entity/cart.entity';
import { Product } from 'src/products/entity/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async addToCart(userId: number, productId: number, quantity: number) {
    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    const existingCartItem = await this.cartRepository.findOne({
      where: { product: { id: productId }, user: { id: userId } },
    });

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
      return this.cartRepository.save(existingCartItem);
    }

    const newCartItem = this.cartRepository.create({
      product,
      user: { id: userId },
      quantity,
    });

    return this.cartRepository.save(newCartItem);
  }

  async getCartByUser(userId: number) {
    return this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product', 'product.student'], 
    });
  }
  
  async removeFromCart(id: number, userId: number) {
    const cartItem = await this.cartRepository.findOne({ where: { id, user: { id: userId } } });

    if (!cartItem) {
      throw new Error('Producto no encontrado en el carrito');
    }

    return this.cartRepository.delete(id);
  }

  async clearCart(userId: number) {
    return this.cartRepository.delete({ user: { id: userId } });
  }
  
}
