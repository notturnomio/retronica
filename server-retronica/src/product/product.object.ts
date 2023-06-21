import { Prisma } from '@prisma/client';
import { returnCategoryObject } from 'src/category/category.object';
import { returnReviewObject } from 'src/review/review.object';

export const returnProductObject: Prisma.ProductSelect = {
  id: true,
  name: true,
  slug: true,
  description: true,
  images: true,
  price: true,
  createdAt: true
};

export const returnProductObjectFull: Prisma.ProductSelect = {
  ...returnProductObject,
  reviews: {
    select: returnReviewObject
  },
  category: { select: returnCategoryObject }
};
