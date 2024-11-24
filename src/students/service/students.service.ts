import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entity/student.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private readonly studentsRepository: Repository<Student>,
        private readonly jwtService: JwtService,
    ) { }

    async findAll(): Promise<Student[]> {
        const students = await this.studentsRepository.find();
        console.log('Datos obtenidos del repositorio:', students);
        return students;
    }

    async create(studentData: Partial<Student>): Promise<Student> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(studentData.password, saltRounds);

        const newStudent = this.studentsRepository.create({
            ...studentData,
            password: hashedPassword,
        });
        return this.studentsRepository.save(newStudent);
    }

    async validateUser(email: string, password: string): Promise<any> {
        const student = await this.studentsRepository.findOneBy({ email });
      
        if (!student) {
          throw new Error('Usuario no encontrado');
        }
      
        const isPasswordValid = await bcrypt.compare(password, student.password);
      
        if (!isPasswordValid) {
          throw new Error('Contraseña incorrecta');
        }
      
        const { password: _, ...userData } = student;
        return userData;
      }
      

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async getProfile(userId: number): Promise<any> {
        const student = await this.studentsRepository.findOneBy({ id: userId });
        if (!student) {
            throw new Error('Usuario no encontrado');
        }

        const { name, campus, career, email, phone } = student;
        return { name, campus, career, email, phone };
    }

    async updateUser(
        userId: number,
        updateData: { phone?: string; password?: string },
      ): Promise<any> {
        const student = await this.studentsRepository.findOneBy({ id: userId });
      
        if (!student) {
          throw new Error('Usuario no encontrado');
        }
      
        if (updateData.password) {
          const saltRounds = 10;
          updateData.password = await bcrypt.hash(updateData.password, saltRounds);
        }
      
        const updatedStudent = Object.assign(student, updateData);
        return this.studentsRepository.save(updatedStudent);
      }
}
