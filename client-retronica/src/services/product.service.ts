import { axiosClassic, instance } from 'api/api.interceptor';
import {
  IProduct,
  TypePaginationProducts,
  TypeProductData,
  TypeProductFilters
} from 'types/product.interface';

const PRODUCTS = 'products';

const ProductService = {
  async getAll(queryData = {} as TypeProductFilters) {
    const { data } = await axiosClassic<TypePaginationProducts>({
      url: PRODUCTS,
      method: 'GET',
      params: queryData
    });
    return data;
  },

  async getSimilar(productId: string) {
    return axiosClassic<IProduct[]>({
      url: `${PRODUCTS}/similar/${productId}`,
      method: 'GET'
    });
  },

  async getBySlug(slug: string) {
    return axiosClassic<IProduct>({
      url: `${PRODUCTS}/by-slug/${slug}`,
      method: 'GET'
    });
  },

  async getByCategory(categorySlug: string) {
    return axiosClassic<IProduct[]>({
      url: `${PRODUCTS}/by-category/${categorySlug}`,
      method: 'GET'
    });
  },

  async getById(id: string) {
    return instance<IProduct>({
      url: `${PRODUCTS}/${id}`,
      method: 'GET'
    });
  },

  async create(productId: string) {
    return instance<IProduct>({
      url: PRODUCTS,
      method: 'POST'
    });
  },

  async update(id: string, data: TypeProductData) {
    return instance<IProduct>({
      url: `${PRODUCTS}/${id}`,
      method: 'PUT',
      data
    });
  },

  async delete(id: string) {
    return instance<IProduct>({
      url: `${PRODUCTS}/${id}`,
      method: 'DELETE'
    });
  }
};

export default ProductService;
