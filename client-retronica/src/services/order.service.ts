import { instance } from 'api/api.interceptor';
import { IOrder, IPlaceOrderResponse } from 'types/order.interface';

import { IOrderCheckout } from './../types/order.interface';

const ORDERS = 'orders';

const OrderService = {
  async getAll() {
    return instance<IOrder[]>({
      url: ORDERS,
      method: 'GET'
    });
  },

  async placeOrder(data: IOrderCheckout, userId: number) {
    return instance<IPlaceOrderResponse>({
      // url: `${ORDERS}/checkout`,
      url: ORDERS,
      method: 'POST',
      data
    });
  }
};

export default OrderService;
