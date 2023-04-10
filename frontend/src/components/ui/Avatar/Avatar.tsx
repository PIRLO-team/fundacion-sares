// Next

// Next
import Image from 'next/image';

// Styles
import s from './Avatar.module.scss';

type TAvatar = {
  name?: string | null;
  username?: string | null;
  email?: string | null;
  src?: string;
  size?: number;
  className?: string;
  classNameText?: string;
  classNameImg?: string;
};

export const Avatar = ({
  src,
  size = 50,
  name,
  username,
  email,
  className,
  classNameText,
  classNameImg,
}: TAvatar) => {
  return (
    // Se puede mejorar
    <div className={`${s.avatar} ${className}`}>
      <Image
        src={src || `https://source.boringavatars.com/marble/120/${username}`}
        alt={`${username} Avatar`}
        width={size}
        height={size}
        className={`${s.avatar__img} ${classNameImg}`}
      />
      {name && (
        <div className={`${s.avatar__info}`}>
          {name && (
            <p className={`${s.avatar__info__name}  ${classNameText}`}>
              {name}
            </p>
          )}
          {username && <p className={s.avatar__info__email}>@{username}</p>}
          {email && <p className={s.avatar__info__email}>{email}</p>}
        </div>
      )}
    </div>
  );
};
