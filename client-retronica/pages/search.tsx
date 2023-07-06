import { useQuery } from '@tanstack/react-query';
import Meta from 'components/ui/Meta';
import Catalog from 'components/ui/catalog/Catalog';
import Layout from 'components/ui/layout/Layout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import ProductService from 'services/product.service';

const SearchPage: NextPage = () => {
  const { query } = useRouter();

  const { data } = useQuery(['search products', query.term], () =>
    ProductService.getAll({ searchTerm: query.term as string })
  );

  return (
    <Meta title="Search">
      <Layout>
        <Catalog
          products={data?.products || []}
          title={`Search by "${query.term || ''}" request`}
        />
      </Layout>
    </Meta>
  );
};

export default SearchPage;
