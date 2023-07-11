import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import ProductService from 'services/product.service';
import {
  EnumProductSort,
  TypePaginationProducts
} from 'types/product.interface';
import Heading from '../Heading';
import Loader from '../Loader';
import Button from '../button/Button';
import SortDropdown from './SortDropdown';
import ProductItem from './product-item/ProductItem';

interface ICatalogPagination {
  data: TypePaginationProducts;
  title?: string;
}

const CatalogWithPagination: FC<ICatalogPagination> = ({ data, title }) => {
  const [page, setPage] = useState(1);
  const initialPerPage = 4;
  const [sortType, setSortType] = useState<EnumProductSort>(
    EnumProductSort.NEWEST
  );

  const { data: response, isLoading } = useQuery(
    ['products', sortType, page],
    () =>
      ProductService.getAll({
        page,
        perPage: initialPerPage,
        sort: sortType
      }),
    { initialData: data, keepPreviousData: true }
  );

  if (isLoading) return <Loader />;

  return (
    <section>
      {title && <Heading className="mb-3 mt-3">{title}</Heading>}
      <SortDropdown sortType={sortType} setSortType={setSortType} />
      {response.products.length ? (
        <>
          <div className="grid grid-cols-4 gap-10">
            {response.products.map(product => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            {Array.from({
              length: Math.ceil(response.length / initialPerPage)
            }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <Button
                  className="mx-3 h-[40px] w-[40px] md:px-1 md:py-1"
                  key={pageNumber}
                  theme={page === pageNumber ? 'yellow' : 'white'}
                  size="sm"
                  onClick={() => {
                    setPage(pageNumber);
                  }}
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>
        </>
      ) : (
        <div>No products to display.</div>
      )}
    </section>
  );
};

export default CatalogWithPagination;
