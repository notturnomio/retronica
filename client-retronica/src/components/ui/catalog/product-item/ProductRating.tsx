import { FC, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { IProduct } from 'types/product.interface';
import tailwindConfig from '../../../../../tailwind.config.js';

const ProductRating: FC<{ product: IProduct }> = ({ product }) => {
  const [rating, setRating] = useState<number>(
    product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length || 0
  );

  return (
    <div className="">
      {!!product.reviews.length && (
        <span className="mr-1">
          <Rating
            readonly
            initialValue={rating}
            SVGstyle={{ display: 'inline-block' }}
            fillColor={tailwindConfig.theme.colors.primary}
            emptyColor={tailwindConfig.theme.colors.light_grey}
            size={20}
            allowFraction
            transition
          />
        </span>
      )}
      {rating ? (
        <span className="mr-1 text-xs font-bold text-primary">
          {rating.toFixed(1)}
        </span>
      ) : (
        ''
      )}
      <span className="text-xs">({product.reviews.length} reviews)</span>
    </div>
  );
};

export default ProductRating;
