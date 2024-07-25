import { IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class MonthYearDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(12)
  @Min(1)
  month: number;

  @IsNotEmpty()
  @IsNumber()
  @Max(2100)
  @Min(2024)
  year: number;
}