import Main from 'components/screens/main/Main';
import { GetStaticProps, NextPage } from 'next';
import ProductService from 'services/product.service';
import { TypePaginationProducts } from 'types/product.interface';

const HomePage: NextPage<TypePaginationProducts> = ({ products, length }) => {
  return <Main products={products} length={length} />;
};

export const getStaticProps: GetStaticProps<
  TypePaginationProducts
> = async () => {
  const data = await ProductService.getAll({
    page: 1,
    perPage: 4
  });

  return {
    props: data
  };
};

export default HomePage;
