import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { getFromLocalStorage } from 'lib/utils';
import {
  IAddToCartPayload,
  ICartInitialState,
  ICartItem,
  IChangeQuantityPayload
} from 'types/cart.interface';
import { IProduct } from 'types/product.interface';

// import type { Product } from 'types/product.interface';

const initialState: ICartInitialState = {
  items: []
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IAddToCartPayload>) => {
      const newItem = action.payload;
      const isItemExist = state.items.some(
        item => item.product.id === action.payload.product.id
      );

      if (!isItemExist) {
        state.items.push({ ...action.payload, id: state.items.length });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    changeQuantity: (state, action: PayloadAction<IChangeQuantityPayload>) => {
      const { id, type } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item)
        type === 'plus'
          ? item.quantity++
          : item.quantity >= 0
          ? item.quantity--
          : item.quantity;
    },
    clearCart: state => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, changeQuantity, clearCart } =
  cartSlice.actions;
