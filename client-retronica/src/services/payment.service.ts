import { instance } from 'api/api.interceptor';
import { IPaymentResponse } from 'types/payment.interface';

const PAYMENT = 'payments';

const PaymentService = {
  async createPayment(amount: number) {
    return instance.post<IPaymentResponse>(PAYMENT, { amount });
  }
};

export default PaymentService;
