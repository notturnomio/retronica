import cn from 'clsx';
import Button from 'components/ui/button/Button';
import RoundButton from 'components/ui/button/RoundButton';
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

  const { push, replace } = useRouter();
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
    <div className="relative" ref={ref} title="cart">
      <RoundButton
        Icon={RiShoppingCartLine}
        onClick={() => setIsShow(!isShow)}
        number={items.length}
      />
      <div
        className={cn(
          'menu absolute -left-[15rem] top-[3.2rem] z-20 block max-h-[85vh] w-80 overflow-auto rounded-xl bg-secondary px-5 py-3 text-sm text-white',
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
            onClick={() => push('/orders/checkout')}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderCart;
