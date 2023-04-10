// Next
import Image from 'next/image';
import Link from 'next/link';

// UI Components
import { Avatar, Status } from '@/components/ui';

// Styles
import s from './infoCard.module.scss';

// Types

function InfoCard({ data }: { data: any }) {
  return (
    <tr key={data.id} className={s.infoCard}>
      <td>
        <div className={s.infoCard__item__name}>
          <Avatar
            name={`${data.first_name} ${data.last_name}`}
            email={data.email}
            size={40}
          />
        </div>
      </td>
      <td className={s.infoCard__item__date}>{data.profession}</td>
      <td>
        <Status status={data.is_active} />
      </td>
      <td>
        <div className={s.infoCard__item__actions}>
          <Image
            src="/icons/Actions/actions.svg"
            alt="Actions"
            width={24}
            height={24}
          />
        </div>
      </td>
    </tr>
  );
}

export default InfoCard;
