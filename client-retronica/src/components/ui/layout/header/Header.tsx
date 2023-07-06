import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import HeaderProfile from './HeaderProfile';
import Search from './Search';
import HeaderCart from './cart/HeaderCart';

const Header: FC = () => {
  return (
    <header
      className="grid w-full bg-black px-6 py-6"
      style={{ gridTemplateColumns: '1fr 3fr 1.2fr' }}
    >
      <Link href={'/'}>
        <Image
          priority
          width={180}
          height={40}
          src="/images/retronica-logo-white.svg"
          alt="Retronica Marketplace"
        />
      </Link>
      <Search />
      <div className="flex items-center justify-end gap-10">
        <Link href="/favorites" className="text-white">
          <AiOutlineHeart size={28} title="My favorites" />
        </Link>
        <HeaderCart />
        <HeaderProfile />
      </div>
    </header>
  );
};

export default Header;
