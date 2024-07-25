import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class SaveSallaryDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(999999)
  sallary: number;
}