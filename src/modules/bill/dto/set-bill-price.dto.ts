import { PickType } from '@nestjs/mapped-types';
import { SaveBillDto } from './save-bill.dto';

export class SetBillPriceDto extends PickType(SaveBillDto, ['id', 'price'] as const) {

}