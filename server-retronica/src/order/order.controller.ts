import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { OrderDto } from './order.dto';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Auth()
  @Get()
  async getAll(@CurrentUser('id') id: number) {
    return this.orderService.getAllOrders(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  placeOrder(@Body() dto: OrderDto, @CurrentUser('id') userId: number) {
    return this.orderService.placeOrder(dto, userId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('create-payment-intent')
  createPaymentIntent(amount: number) {
    return this.orderService.createPaymentIntent(amount);
  }

  // @HttpCode(200)
  // @Post('status')
  // async updateStatus(@Body() dto: PaymentStatusDto) {
  //   return this.orderService.updateStatus(dto);
  // }
}
