import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ReviewDto } from './review.dto';
import { returnReviewObject } from './review.object';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}

  async getAllReviews() {
    return this.prisma.review.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: returnReviewObject
    });
  }

  async createReview(userId: number, dto: ReviewDto, productId: number) {
    return this.prisma.review.create({
      data: {
        ...dto,
        product: {
          connect: {
            id: productId
          }
        },
        user: {
          connect: {
            id: userId
          }
        }
      }
    });
  }

  async getAverageRating(productId: number) {
    const data = await this.prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true }
    });
    return data._avg.rating || 0;
  }
}
