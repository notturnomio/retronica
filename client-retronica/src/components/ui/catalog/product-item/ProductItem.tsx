import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { IProduct } from 'types/product.interface';
import { convertPriceEuro } from 'utils/convertPrice';
import AddToCartButton from './AddToCartButton';
import ProductRating from './ProductRating';

const DynamicFavoriteButton = dynamic(() => import('./FavoriteButton'), {
  ssr: false
});

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div className="animate-scaleIn">
      <div className="d-flex relative overflow-hidden rounded-xl">
        <div className="absolute right-3 top-2 z-[3]">
          <DynamicFavoriteButton productId={product.id} />
          <AddToCartButton product={product} />
        </div>
        <Link href={`/product/${product.slug}`}>
          <Image
            className="relative"
            width={250}
            height={250}
            src={product.images[0]}
            alt={product.name}
          />
        </Link>
      </div>
      <Link href={`/product/${product.slug}`}>
        <h3 className="mt-2 font-bold">{product.name}</h3>
      </Link>
      <Link
        href={`/category/${product.category.slug}`}
        className="text-sm font-bold text-secondary"
      >
        {product.category.name}
      </Link>
      <ProductRating product={product} />
      <div className="mb-1 mt-1 text-xl font-bold">
        {convertPriceEuro(product.price)}
      </div>
    </div>
  );
};

export default ProductItem;
