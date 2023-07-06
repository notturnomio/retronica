import cn from 'clsx';
import Button from 'components/ui/button/Button';
import SquareButton from 'components/ui/button/SquareButton';
import { useCart } from 'hooks/useCart';
import { useOutside } from 'hooks/useOutside';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { RiShoppingCartLine } from 'react-icons/ri';
import { convertPriceEuro } from 'utils/convertPrice';
import styles from './Cart.module.scss';
import CartItem from './cart-item/CartItem';

const HeaderCart: FC = () => {
  const { isShow, setIsShow, ref } = useOutside(false);
  const { items, total } = useCart();

  const { push } = useRouter();
  // const { mutate } = useMutation(
  //   ['create payment'],
  //   () => PaymentService.createPayment(total),
  //   {
  //     onSuccess(data) {
  //       push(data.confirmation.confirmation.url);
  //     }
  //   }
  // );

  return (
    <div className="relative" ref={ref}>
      <SquareButton
        Icon={RiShoppingCartLine}
        onClick={() => setIsShow(!isShow)}
        number={items.length}
      />
      <div
        className={cn(
          'menu absolute -left-[12.5rem] top-[3.2rem] z-20 w-80 rounded-xl bg-secondary px-5 py-3 text-sm text-white',
          isShow ? 'open-menu' : 'close-menu'
        )}
      >
        <div className=" text-lg font-bold">In my cart</div>
        <div className={styles.cart}>
          {items.length ? (
            items.map(item => (
              <CartItem item={item} key={`${item.id}-${item.product.name}`} />
            ))
          ) : (
            <div className="font-light">Your cart is empty</div>
          )}
        </div>
        <div className={styles.footer}>
          <div>Total:</div>
          <div>{convertPriceEuro(total)}</div>
        </div>
        <div className="text-center ">
          <Button
            theme="white"
            size="sm"
            className="btn-link mb-2 mt-5 text-secondary"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderCart;
