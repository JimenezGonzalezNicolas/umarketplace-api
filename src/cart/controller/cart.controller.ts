import { Body, Controller, Delete, Get, Param, Post, UseGuards, Req } from '@nestjs/common';
import { CartService } from '../service/cart.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { MailService } from 'src/mail/service/mailer.service';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  async addToCart(
    @Req() request: any,
    @Body() cartData: { productId: number; quantity: number },
  ) {
    return this.cartService.addToCart(request.user.userId, cartData.productId, cartData.quantity);
  }

  @Get()
  async getCartByUser(@Req() request: any) {
    return this.cartService.getCartByUser(request.user.userId);
  }

  @Delete(':id')
  async removeFromCart(@Param('id') id: number, @Req() request: any) {
    return this.cartService.removeFromCart(id, request.user.userId);
  }

  @Delete()
  async clearCart(@Req() request: any) {
    const userId = request.user.userId; // Corrige la referencia al userId
    return this.cartService.clearCart(userId);
  }

  @Post('purchase')
  async purchaseCart(@Req() request: any) {
    const userId = request.user.userId;
  
    // Obtener los productos del carrito con relaciones completas
    const cartItems = await this.cartService.getCartByUser(userId);
  
    if (cartItems.length === 0) {
      throw new Error('El carrito está vacío. No se puede realizar la compra.');
    }
  
    // Limpiar el carrito tras la compra
    await this.cartService.clearCart(userId);
  
    // Enviar correo con los detalles de la compra
    await this.mailService.sendPurchaseDetails(request.user.email, {
      buyerName: request.user.name,
      cartItems: cartItems.map((item) => ({
        productName: item.product.name,
        productPrice: item.product.price.toString(), // Convertir a string si es necesario
        sellerName: item.product.student.name,
        sellerContact: item.product.student.email,
      })),
    });
  
    return {
      message: 'Compra realizada con éxito. Revisa tu correo para más detalles.',
    };
  }
  
}
