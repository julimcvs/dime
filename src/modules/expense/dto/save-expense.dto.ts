import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class SaveExpenseDto {
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

  @IsNotEmpty()
  @IsNumber({maxDecimalPlaces: 2})
  @Max(99999)
  @Min(1)
  price: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  paymentDay: Date;

  @Max(99999)
  @Min(1)
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}