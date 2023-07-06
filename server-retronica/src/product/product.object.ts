import { Prisma } from '@prisma/client';
import { returnCategoryObject } from 'src/category/category.object';
import { returnReviewObject } from 'src/review/review.object';

export const returnProductObject: Prisma.ProductSelect = {
  id: true,
  name: true,
  slug: true,
  category: { select: returnCategoryObject },
  description: true,
  images: true,
  price: true,
  createdAt: true,
  reviews: {
    select: returnReviewObject
  }
};
