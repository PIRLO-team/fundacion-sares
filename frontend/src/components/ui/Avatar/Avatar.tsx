// Next

// Next
import Image from 'next/image';

// Chakra UI
import { useDisclosure } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

// Hooks
import { useAuthStore, useUsersStore } from '@/hooks';

// Local Components
import { ChangeAvatarModal } from './components/ChangeAvatarModal/ChangeAvatarModal';

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
  const { currentUser } = useAuthStore();
  const { activeUser } = useUsersStore();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    // Se puede mejorar
    <div className={`${s.avatar} ${className}`}>
      <div
        className={
          currentUser.uid === activeUser?.user_id
            ? s.avatar__container
            : undefined
        }
      >
        <Image
          src={src ?? `https://source.boringavatars.com/marble/120/${username}`}
          alt={`${username} Avatar`}
          width={size}
          height={size}
          className={`${s.avatar__container__img} ${classNameImg}`}
          priority
        />

        {currentUser.uid === activeUser?.user_id && (
          <>
            <div className={s.avatar__container__content} onClick={onOpen}>
              <EditIcon boxSize="30px" />
            </div>

            <ChangeAvatarModal isOpen={isOpen} onClose={onClose} />
          </>
        )}
      </div>
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
