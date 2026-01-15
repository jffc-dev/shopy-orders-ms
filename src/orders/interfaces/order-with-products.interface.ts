import { OrderStatus } from 'generated/prisma/client';

export interface OrderWithProducts {
  items: {
    productId: number;
    productName: any;
    quantity: number;
    price: number;
  }[];
  id: string;
  totalAmount: number;
  totalItems: number;
  status: OrderStatus;
  paid: boolean;
  paidAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
