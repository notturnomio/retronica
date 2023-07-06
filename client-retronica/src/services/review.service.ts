import { axiosClassic, instance } from 'api/api.interceptor';
import { IReview, TypeReviewData } from 'types/review.interface';

const REVIEWS = 'reviews';

const ReviewService = {
  async getAll() {
    return axiosClassic<IReview[]>({
      url: REVIEWS,
      method: 'GET'
    });
  },

  async getAverageByProduct(productId: string | number) {
    return axiosClassic<number>({
      url: `${REVIEWS}/average-by-product/${productId}`,
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
