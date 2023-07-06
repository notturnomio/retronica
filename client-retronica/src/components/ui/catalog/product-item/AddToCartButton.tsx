import { useActions } from 'hooks/useActions';
import { useCart } from 'hooks/useCart';
import { FC } from 'react';
import { FaCartPlus, FaRegRectangleXmark } from 'react-icons/fa6';
import { IProduct } from 'types/product.interface';

const AddToCartButton: FC<{ product: IProduct }> = ({ product }) => {
  const { addToCart, removeFromCart } = useActions();
  const { items } = useCart();

  const currentItem = items.find(
    cartItem => cartItem.product.id === product.id
  );

  return (
    // <div className="absolute right-[35px] top-[70px]">
    <div>
      <button
        onClick={() =>
          currentItem
            ? removeFromCart({ id: currentItem.id })
            : addToCart({
                product,
                quantity: 1,
                price: product.price
              })
        }
      >
        {currentItem ? (
          <FaRegRectangleXmark
            title="Remove from basket"
            className="fill-accent"
          />
        ) : (
          <FaCartPlus aria-label="Add to basket" className="fill-accent" />
        )}
      </button>
    </div>
  );
};

export default AddToCartButton;
