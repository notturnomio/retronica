import { FC } from 'react';
import { IProduct } from 'types/product.interface';
import Heading from '../Heading';
import Loader from '../Loader';
import ProductItem from './product-item/ProductItem';

interface ICatalog {
  products: IProduct[];
  isLoading?: boolean;
  title?: string;
  isPagination?: boolean;
}

const Catalog: FC<ICatalog> = ({ products, isLoading, title }) => {
  if (isLoading) return <Loader />;

  return (
    <section>
      {title && <Heading className="mb-3 mt-3">{title}</Heading>}
      {products.length ? (
        <>
          <div className="grid grid-cols-4 gap-10">
            {products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div>No products to display.</div>
      )}
    </section>
  );
};

export default Catalog;
