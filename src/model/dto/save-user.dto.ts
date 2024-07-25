import { IsNumber, IsOptional, Max, Min } from 'class-validator';
import { SignUpDto } from './sign-up.dto';

export class SaveUserDto extends SignUpDto {
  @Max(99999)
  @Min(1)
  @IsNumber()
  @IsOptional()
  id?: number;
}