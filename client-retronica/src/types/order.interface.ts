import { ICartItem } from './cart.interface';
import { IUser } from './user.interface';

export enum EnumOrderStatus {
  PENDING = 'PENDING',
  PAYED = 'PAYED',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED'
}

export interface IOrder {
  id: number;
  createdAt: string;
  items: ICartItem[];
  status: EnumOrderStatus;
  user: IUser;
  amount: number;
  paymentIntentId: string;
}

export interface IOrderCheckout {
  items: ICartItem[];
  status?: EnumOrderStatus;
}

export interface IPlaceOrderResponse {
  paymentIntentObj: {
    id: string;
    client_secret: string;
    // Add other necessary properties based on your usage
  };
  order: {
    id: number;
    createdAt: string;
    updatedAt: string;
    status: string;
    amount: number;
    paymentIntentId: string;
    userId: number;
  };
}
