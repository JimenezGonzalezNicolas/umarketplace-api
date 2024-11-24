import { IsOptional, IsString, MinLength, Matches } from 'class-validator';

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
  @Matches(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
  @Matches(/[0-9]/, { message: 'La contraseña debe contener al menos un número' })
  password: string;
}
