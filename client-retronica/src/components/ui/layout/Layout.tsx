import { FC, PropsWithChildren } from 'react';
import Header from './header/Header';
import Sidebar from './sidebar/Sidebar';

const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <div className="flex h-screen overflow-x-hidden">
      <Header />
      <div
        className="mt-[88px] grid w-full"
        style={{ gridTemplateColumns: '1fr 4fr' }}
      >
        <Sidebar />
        <main className="flex-grow p-12">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
