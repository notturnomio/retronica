import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticsService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService
  ) {}

  async getMainStatistics(userId: number) {
    const user = await this.userService.byId(userId, {
      orders: {
        select: {
          items: {
            select: {
              price: true
            }
          }
        }
      },
      reviews: true
    });

    // const totalAmountSpent = await this.prisma.order.aggregate({
    //   where: { userId },
    //   _sum: {
    //     orders: {
    //       items: {
    //         price: true
    //       }
    //     }
    //   }
    // });

    return [
      {
        name: 'Orders',
        value: user.orders.length
      },
      {
        name: 'Reviews',
        value: user.reviews.length
      },
      {
        name: 'Favorites',
        value: user.favorites.length
      },
      {
        name: 'Total Amount Spent',
        value: 1000
      }
    ];
  }
}
