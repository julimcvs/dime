import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class SaveBillDto {
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
  @IsNumber()
  @Max(31)
  @Min(1)
  recurrentPaymentDay: number;

  @IsBoolean()
  @IsNotEmpty()
  sendNotification: boolean;

  @IsBoolean()
  @IsNotEmpty()
  isFixedPrice: boolean;
}