import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useProfile } from 'hooks/useProfile';
import { FC } from 'react';
import { FaHeartCircleMinus, FaHeartCirclePlus } from 'react-icons/fa6';
import UserService from 'services/user.service';

const FavoriteButton: FC<{ productId: number }> = ({ productId }) => {
  const { profile } = useProfile();

  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    ['toggle favorite'],
    () => UserService.toggleFavorite(productId),
    {
      onSuccess() {
        queryClient.invalidateQueries(['get profile']);
      }
    }
  );

  if (!profile) return null;

  const isExist = profile.favorites.some(favorite => favorite.id === productId);

  return (
    // <div className="absolute right-[35px] top-[35px]">
    <div>
      <button onClick={() => mutate()}>
        {isExist ? (
          <FaHeartCircleMinus
            title="Remove from favorites"
            className="fill-red"
          />
        ) : (
          <FaHeartCirclePlus
            aria-label="Add to favorites"
            className="fill-primary"
          />
        )}
      </button>
    </div>
  );
};

export default FavoriteButton;
