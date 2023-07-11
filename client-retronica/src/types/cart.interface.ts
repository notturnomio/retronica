import { IProduct } from './product.interface';

export interface ICartItem {
  id: number;
  product: IProduct;
  quantity: number;
  price: number;
  productId: number;
  // productId: IProduct['id'];
}

export interface ICartInitialState {
  items: ICartItem[];
}

export interface IAddToCartPayload extends Omit<ICartItem, 'id'> {}

export interface IChangeQuantityPayload extends Pick<ICartItem, 'id'> {
  type: 'minus' | 'plus';
}
