// import { Module } from '@nestjs/common';
// import { MailerModule } from '@nestjs-modules/mailer';
// import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
// import { MailService } from './service/mailer.service';
// import { join } from 'path';

// @Module({
//   imports: [
//     MailerModule.forRoot({
//       transport: {
//         host: 'mail.umarketplace.cl',
//         port: 465,
//         secure: true,
//         auth: {
//           user: 'compras@umarketplace.cl',
//           pass: 'Pelaoctm.123#',
//         },
//         debug: true,
//       },
//       defaults: {
//         from: '"UMarketplace" <compras@umarketplace.cl>',
//       },
//       template: {
//         dir: join(__dirname, 'templates'),
//         adapter: new PugAdapter(),
//         options: {
//           strict: true,
//         },
//       },
//     }),
//   ],
//   providers: [MailService],
//   exports: [MailService, MailerModule], 
// })
// export class MailerConfigModule {}
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailService } from './service/mailer.service';
import { join } from 'path';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('MAIL_HOST'),
          port: configService.get<number>('MAIL_PORT'),
          secure: true,
          auth: {
            user: configService.get<string>('MAIL_USER'),
            pass: configService.get<string>('MAIL_PASSWORD'),
          },
        },
        defaults: {
          from: configService.get<string>('MAIL_FROM'),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailerConfigModule {}

