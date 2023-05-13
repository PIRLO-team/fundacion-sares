// React
import { useEffect, useRef, useState } from 'react';

// Next
import Image from 'next/image';

// Hooks
import { useAuthStore, useUsersStore } from '@/hooks';

// UI Components
import { Avatar, Status } from '@/components/ui';

// Styles
import s from './infoCard.module.scss';

// Types
import { TUser } from '@/utils/types/';

// Types

function InfoCard({ data }: { data: TUser }) {
  const { currentUser } = useAuthStore();

  const { activeUser, startLoadingUsers, setActiveUser, startInactiveUser } =
    useUsersStore();

  const [Open, setOpen] = useState(false);

  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [ref]);

  return (
    <>
      <tr key={data!.user_id} className={s.infoCard}>
        <td>
          <div className={s.infoCard__item__name}>
            <Avatar
              name={`${data!.first_name} ${data!.last_name}`}
              email={data!.email}
              size={40}
            />
          </div>
        </td>
        <td className={s.infoCard__item__roleName}>{data!.profession}</td>
        <td className={s.infoCard__item__roleName}>
          {data!.userRole.role_name}
        </td>
        <td>
          <Status status={data!.is_active} />
        </td>
        <td>
          {data!.username !== currentUser.username && (
            <div
              className={s.infoCard__item__actions}
              onClick={() => {
                setOpen(!Open);
              }}
            >
              <Image
                src="/icons/Actions/actions.svg"
                alt="Actions"
                width={24}
                height={24}
              />
            </div>
          )}
        </td>
      </tr>

      {/* Dropdown */}
      {Open && (
        <>
          <div
            className={s.infoCard__dropdown}
            ref={ref as React.RefObject<HTMLDivElement>}
          >
            <div
              className={s.infoCard__dropdown__item}
              onClick={() => {
                startInactiveUser(data!);
                startLoadingUsers();
                setOpen(!Open);
              }}
            >
              <Image
                src={
                  data?.is_active
                    ? '/icons/Actions/not-complete.svg'
                    : '/icons/Actions/complete.svg'
                }
                alt="Editar"
                width={24}
                height={24}
              />
              <p className={s.infoCard__dropdown__item__text}>
                {data?.is_active
                  ? 'Marcar como inactivo'
                  : 'Marcar como activo'}
              </p>
            </div>
            <div
              className={s.infoCard__dropdown__item}
              onClick={() => {
                setOpen(!Open);
                setActiveUser(data);
              }}
            >
              <Image
                src="/icons/Actions/edit.svg"
                alt="Eliminar"
                width={24}
                height={24}
              />

              <p className={s.infoCard__dropdown__item__text}>Editar usuario</p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default InfoCard;
