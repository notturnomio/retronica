import { setLocalStorage } from 'lib/utils';
import type { AnyAction, Middleware } from 'redux';
import { TypeRootState } from 'store/store';

export const cartMiddleware: Middleware<{}, TypeRootState> =
  store => next => (action: AnyAction) => {
    const result = next(action);
    const state = store.getState();

    setLocalStorage('cart', JSON.stringify(state.cart.items));

    return result;
  };
