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

import { useCart } from 'hooks/useCart';
import { NextPageAuth } from 'providers/auth-provider/auth-page.types';
import { useEffect, useState } from 'react';
import OrderService from 'services/order.service';

const SuccessPage: NextPageAuth = () => {
  return (
    <Meta title="Payment Success">
      <Layout>
        <div>
          Your payment proceeded successfully. You can return to main page.
        </div>
      </Layout>
    </Meta>
  );
};

SuccessPage.isOnlyUser = true;

export default SuccessPage;
