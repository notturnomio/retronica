import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { getFromLocalStorage } from 'lib/utils';
import { ICartInitialState, ICartItem } from 'types/cart.interface';
import { IProduct } from 'types/product.interface';

// import type { Product } from 'types/product.interface';

const initialState: ICartInitialState = {
  items: JSON.parse(getFromLocalStorage('cart') || '[]')
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: ICartInitialState, action: PayloadAction<ICartItem>) => {
      const newItem = action.payload;
      const isItemExist = current(state.items).findIndex(
        item => item.id === newItem.id
      );
      if (isItemExist >= 0) return;
      state.items.push({
        ...newItem,
        id: newItem.id
        // count: newItem.count || 1
      });
    },
    removeFromCart: (
      state: ICartInitialState,
      action: PayloadAction<IProduct>
    ) => {
      const itemId = action.payload.id;
      state.items = current(state.items).filter(item => item.id !== itemId);
    },
    updateCartItem: (
      state: ICartInitialState,
      action: PayloadAction<ICartItem>
    ) => {
      const itemId = action.payload.id;
      const index = current(state.items).findIndex(item => item.id === itemId);
      if (index >= 0) {
        state.items[index] = action.payload;
      }
    },
    clearCart: (state: ICartInitialState) => {
      state.items = [];
    }
  }
});

export const { addToCart, removeFromCart, updateCartItem, clearCart } =
  cartSlice.actions;
