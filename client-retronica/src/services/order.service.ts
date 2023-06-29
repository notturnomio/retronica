import { instance } from 'api/api.interceptor';
import { IOrder } from 'types/order.interface';

const ORDERS = 'orders';

const OrderService = {
  async getAll() {
    return instance<IOrder[]>({
      url: ORDERS,
      method: 'GET'
    });
  }
};

export default OrderService;
