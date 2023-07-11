import { Elements } from '@stripe/react-stripe-js';
import {
  Appearance,
  StripeElementsOptions,
  loadStripe
} from '@stripe/stripe-js';
import Meta from 'components/ui/Meta';
import CheckoutForm from 'components/ui/checkoutForm/checkoutForm';
import Layout from 'components/ui/layout/Layout';
import { useProfile } from 'hooks/useProfile';

import { useActions } from 'hooks/useActions';
import { useCart } from 'hooks/useCart';
import { NextPageAuth } from 'providers/auth-provider/auth-page.types';
import { useEffect, useState } from 'react';
import OrderService from 'services/order.service';

const stripePromise = loadStripe(
  'pk_test_51NRkAkJXU005DX7GFKWCwGHlpChTWNiroNYExcEMn3ZcIKHD0xZ94DjzBqfO5YqVuK4dEjBzx4aLVjMWJsdrQTop00MUhhFYh1'
);

interface PaymentIntentResponse {
  clientSecret: string;
}

const CheckoutPage: NextPageAuth = () => {
  const { profile } = useProfile();
  const { items, total } = useCart();
  const [clientSecret, setClientSecret] = useState<string | undefined>(
    undefined
  );
  const { clearCart } = useActions();

  useEffect(() => {
    if (profile) {
      console.log(items, profile.id);
      const createPaymentIntent = async () => {
        try {
          // const paymentObj = await OrderService.placeOrder(
          //   { items },
          //   profile.id
          // );

          const response = await OrderService.placeOrder({ items }, profile.id);

          console.log('response', response);

          // if (response && response.data && response.data.paymentIntentObj) {
          if (response) {
            // save response to localStorage
            localStorage.setItem(
              'paymentIntentResponse',
              JSON.stringify(response.data)
            );

            setClientSecret(response.data.paymentIntentObj.client_secret);
            clearCart();
          }
        } catch (error) {
          console.error(error);
          // Handle the error accordingly, e.g., display an error message
        }
      };
      createPaymentIntent();
    }
  }, [profile, items, clearCart]);

  const appearance: Appearance = {
    theme: 'stripe'
  };

  const options: StripeElementsOptions = {
    clientSecret,
    appearance
  };

  return (
    <Meta title="Checkout">
      <Layout>
        <div>Checkout Page</div>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </Layout>
    </Meta>
  );
};

CheckoutPage.isOnlyUser = true;

export default CheckoutPage;
