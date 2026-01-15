import { IsString, IsUrl, IsUUID } from 'class-validator';

export class PaidOrderDto {
  @IsUUID()
  @IsString()
  orderId: string;

  @IsString()
  stripePaymentId: string;

  @IsString()
  @IsUrl()
  receiptUrl: string;
}
