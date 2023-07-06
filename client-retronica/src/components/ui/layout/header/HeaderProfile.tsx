import { useProfile } from 'hooks/useProfile';
import Image from 'next/image';
import { FC } from 'react';

const HeaderProfile: FC = () => {
  const { profile } = useProfile();

  return (
    <div>
      {profile?.avatarPath && (
        <Image
          width={43}
          height={43}
          src={profile.avatarPath}
          alt="profile"
          className="animate-opacity rounded-full border-2 border-solid border-primary"
        />
      )}
    </div>
  );
};

export default HeaderProfile;
