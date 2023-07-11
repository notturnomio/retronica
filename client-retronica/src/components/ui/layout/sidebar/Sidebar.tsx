import { useQuery } from '@tanstack/react-query';
import cn from 'clsx';
import Loader from 'components/ui/Loader';
import { useActions } from 'hooks/useActions';
import { useAuth } from 'hooks/useAuth';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { removeFromStorage } from 'services/auth/auth.helper';
import CategoryService from 'services/category.service';

const Sidebar: FC = () => {
  const { data, isLoading } = useQuery(
    ['get categories'],
    () => CategoryService.getAll(),
    { select: ({ data }) => data }
  );
  const { asPath } = useRouter();
  const { user } = useAuth();
  const { logout } = useActions();

  const logoutHandler = () => {
    logout();
    removeFromStorage();
  };

  return (
    <aside className="flex w-[270px] flex-col justify-between bg-black">
      <div>
        {isLoading ? (
          <Loader />
        ) : data ? (
          <>
            <div className="mb-6 ml-10 mt-10 text-xl text-white">
              Categories:
            </div>
            <ul>
              {data.map(category => (
                <li key={category.id}>
                  <Link
                    className={cn(
                      'my-3 block px-10 text-lg transition-colors duration-200 hover:text-primary',
                      asPath === `/category/${category.slug}`
                        ? 'text-primary'
                        : 'text-white'
                    )}
                    href={`/category/${category.slug}`}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div>No Categories.</div>
        )}
      </div>

      {!!user && (
        <button
          className="mb-10 ml-10 flex w-auto items-center text-white transition-colors duration-200 hover:text-primary"
          onClick={logoutHandler}
        >
          <FiLogOut />
          <span className="ml-2">Logout</span>
        </button>
      )}
    </aside>
  );
};

export default Sidebar;
