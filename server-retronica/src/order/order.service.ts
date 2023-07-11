import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { returnProductObject } from 'src/product/product.object';
import Stripe from 'stripe';
import { OrderDto, OrderItemDto } from './order.dto';

export interface IPaymentIntent {
  id: string;
  client_secret: string;
}

@Injectable()
export class OrderService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15'
    });
  }

  async getAllOrders(userId: number) {
    return this.prisma.order.findMany({
      where: {
        userId
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        items: {
          include: {
            product: {
              select: returnProductObject
            }
          }
        }
      }
    });
  }

  async placeOrder(dto: OrderDto, userId: number) {
    try {
      const orderAmount = this.calculateOrderAmount(dto.items);
      const paymentIntentObj = await this.createPaymentIntent(orderAmount);
      const clientSecret = paymentIntentObj.client_secret;

      const orderItems = dto.items.map(item => ({
        quantity: item.quantity,
        price: item.price,
        productId: item.productId
      }));

      const order = await this.prisma.order.create({
        data: {
          status: dto.status || 'PENDING',
          items: { create: orderItems },
          paymentIntentId: clientSecret,
          amount: orderAmount,
          user: {
            connect: {
              id: userId
            }
          }
        }
      });

      return { paymentIntentObj, order };
    } catch (error) {
      throw new HttpException(
        // 'An error occurred while placing the order.',
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  // async updateStatus(dto: PaymentStatusDto) {
  //   try {
  //     const order = await this.prisma.order.update({
  //       where: {
  //         paymentIntentId: dto.object.id
  //       },
  //       data: {
  //         status: dto.event === 'payment.succeeded' ? 'PAID' : 'FAILED'
  //       }
  //     });
  //     return order;
  //   } catch (error) {
  //     throw new HttpException(
  //       // 'An error occurred while updating the order status.',
  //       error.message,
  //       HttpStatus.INTERNAL_SERVER_ERROR
  //     );
  //   }
  // }

  async createPaymentIntent(orderAmount: number): Promise<IPaymentIntent> {
    try {
      const paymentIntentObj = await this.stripe.paymentIntents.create({
        amount: orderAmount * 100,
        currency: 'eur',
        automatic_payment_methods: {
          enabled: true
        }
      });

      if (paymentIntentObj.status !== 'requires_payment_method') {
        throw new Error('Payment failed.');
      }

      return paymentIntentObj;
    } catch (error) {
      throw new HttpException(
        // 'An error occurred while processing the payment.',
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private calculateOrderAmount(items: OrderItemDto[]): number {
    const orderAmount = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return orderAmount;
  }
}
