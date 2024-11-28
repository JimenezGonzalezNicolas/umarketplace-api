import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { ProductsModule } from './products/products.module';
import { ReportModule } from './reports/report.module';
import { CartModule } from './cart/cart.module';
import { MailerConfigModule } from './mail/mailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    StudentsModule,
    ProductsModule,
    ReportModule,
    CartModule,
    MailerConfigModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// @Module({
// imports: [
//   TypeOrmModule.forRoot({
//     type: 'mysql',
//     host: 'localhost',
//     port: 3306,
//     username: 'root',
//     password: 'umarketplace2024',
//     database: 'umarketplace',
//     entities: [__dirname + '/**/*.entity{.ts,.js}'],
//     synchronize: true,
//   }),
//   StudentsModule, ProductsModule, ReportModule, CartModule, MailerModule
// ],
