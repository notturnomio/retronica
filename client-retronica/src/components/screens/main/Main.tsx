import Meta from 'components/ui/Meta';
import CatalogWithPagination from 'components/ui/catalog/CatalogWithPagination';
import Layout from 'components/ui/layout/Layout';
import { useActions } from 'hooks/useActions';
import { useAuth } from 'hooks/useAuth';
import Cookies from 'js-cookie';
import { FC } from 'react';
import { TypePaginationProducts } from 'types/product.interface';

const Main: FC<TypePaginationProducts> = ({ products, length }) => {
  const { user } = useAuth();
  const { logout } = useActions();
  return (
    <Meta title="Main">
      <Layout>
        <button onClick={() => console.log(Cookies.get('refreshToken'))}>
          Get refresh token
        </button>
        {!!user && <button onClick={() => logout()}>Logout</button>}
        {/* Carousel */}
        <CatalogWithPagination
          title="Last products"
          data={{ products, length }}
        />
      </Layout>
    </Meta>
  );
};

export default Main;
