export class BillDto {
  id: number;
  description: string;
  price: number;
  recurrentPaymentDay: number;
  sendNotification: boolean;
  isFixedPrice: boolean;
}