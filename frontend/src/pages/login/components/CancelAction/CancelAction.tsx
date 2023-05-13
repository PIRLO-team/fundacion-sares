// Next
import Image from 'next/image';
import { useRouter } from 'next/router';

// Styles
import s from './CancelAction.module.scss';

export default function CancelAction() {
  const router = useRouter();

  return (
    <div className={s.cancelAction} onClick={() => router.push('/login')}>
      <Image
        src="/icons/Globals/arrowleft.svg"
        alt="arrow-left"
        width={20}
        height={20}
      />
      <p>Cancelar y volver al inicio de sesion</p>
    </div>
  );
}
