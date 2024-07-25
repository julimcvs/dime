import { IsNotEmpty, IsString, Length } from 'class-validator';
import { LoginDto } from './login.dto';

export class SignUpDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  username: string;
}