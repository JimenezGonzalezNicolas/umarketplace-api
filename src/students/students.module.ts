import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsService } from './service/students.service';
import { StudentsController } from './controller/students.controller';
import { Student } from './entity/student.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guard/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Student]),
  JwtModule.register({
    secret: 'super-secret-key',
    signOptions: { expiresIn: '1h' }, 
  }),],
  providers: [StudentsService, JwtStrategy],
  controllers: [StudentsController],
})
export class StudentsModule {}
