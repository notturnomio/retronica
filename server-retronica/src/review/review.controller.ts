import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ReviewDto } from 'src/review/review.dto';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // get all reviews
  @UsePipes(new ValidationPipe())
  @Get()
  async getAll() {
    return this.reviewService.getAllReviews();
  }

  // create review
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('new/:productId')
  async create(
    @CurrentUser('id') id: number,
    @Body() dto: ReviewDto,
    @Param('productId') productId: string
  ) {
    return this.reviewService.createReview(id, dto, +productId);
  }

  // get average rating
  @UsePipes(new ValidationPipe())
  @Get('reviews/:id')
  @Put(':id')
  async update(@Param('id') reviewId: string) {
    return this.reviewService.getAverageRating(+reviewId);
  }
}
