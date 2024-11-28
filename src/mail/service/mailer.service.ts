import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPurchaseDetails(email: string, details: { buyerName: string; cartItems: Array<{ productName: string; productPrice: string; sellerName: string; sellerContact: string }> }) {
    const { buyerName, cartItems } = details;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Detalles de tu compra en UMarketplace',
        template: './purchase-details',
        context: {
          buyerName,
          cartItems,
        },
      });
      console.log('Correo enviado exitosamente');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  }
}
