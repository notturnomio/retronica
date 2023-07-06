import { useQuery } from '@tanstack/react-query';
import { useActions } from 'hooks/useActions';
import { useAuth } from 'hooks/useAuth';
import { useRouter } from 'next/router';
import { FC } from 'react';
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

  return (
    <aside
      className="flex flex-col justify-between bg-black text-bg_yellow"
      style={{ height: 'calc(100vh - 91px)' }}
    >
      Sidebar
    </aside>
  );
};

export default Sidebar;
