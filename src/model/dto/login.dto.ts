import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  password: string;
}