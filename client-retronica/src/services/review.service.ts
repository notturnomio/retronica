import { instance } from 'api/api.interceptor';
import { IReview, TypeReviewData } from 'types/review.interface';

const REVIEWS = 'reviews';

const ReviewService = {
  async getAll() {
    return instance<IReview[]>({
      url: REVIEWS,
      method: 'GET'
    });
  },

  async create(productId: string, data: TypeReviewData) {
    return instance<IReview>({
      url: `${REVIEWS}/new/${productId}`,
      method: 'POST',
      data
    });
  }
};

export default ReviewService;
