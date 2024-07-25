import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class SaveCategoryDto {
  @Max(99999)
  @Min(1)
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(1)
  description: string;
}