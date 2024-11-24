import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { StudentsService } from '../service/students.service';
import { Student } from '../entity/student.entity';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { UpdateStudentDto } from '../DTO/update-student.dto';


@Controller('students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) { }

    @Get()
    async findAll() {
        return await this.studentsService.findAll();
    }

    @Post('register')
    async register(@Body() studentData: Partial<Student>): Promise<Student> {
        return this.studentsService.create(studentData);
    }

    @Post('login')
    async login(@Body() loginData: { email: string; password: string }): Promise<any> {
      const user = await this.studentsService.validateUser(
        loginData.email,
        loginData.password,
      );
      const token = await this.studentsService.login(user); 

      return {
        access_token: token.access_token, 
        studentId: user.id,
      };
    }
    

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Req() request: any) {
        const userId = request.user.userId;
        return this.studentsService.getProfile(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update')
    async updateUser(
      @Req() request: any,
      @Body() updateData: UpdateStudentDto,
    ) {
      const userId = request.user.userId;
      return this.studentsService.updateUser(userId, updateData);
    }
}
