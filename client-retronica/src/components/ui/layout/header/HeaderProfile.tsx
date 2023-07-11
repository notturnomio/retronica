import RoundButton from 'components/ui/button/RoundButton';
import { useProfile } from 'hooks/useProfile';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { FiLogIn } from 'react-icons/fi';

const HeaderProfile: FC = () => {
  const { profile } = useProfile();

  return profile ? (
    <div
      className="animate-opacity rounded-full"
      title={profile?.name || 'profile'}
    >
      {profile?.avatarPath ? (
        <Image
          width={40}
          height={40}
          src={profile?.avatarPath}
          alt={profile?.name || 'profile'}
          className="rounded-full"
        />
      ) : (
        <FaUserCircle
          size={40}
          title={profile?.name || 'profile'}
          className="rounded-full"
        />
      )}
    </div>
  ) : (
    <Link href="/auth" title="login">
      <RoundButton Icon={FiLogIn} />
    </Link>
  );
};

export default HeaderProfile;
