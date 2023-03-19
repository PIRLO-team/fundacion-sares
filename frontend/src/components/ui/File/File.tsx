// Next
import Image from 'next/image';

// Styles
import s from './File.module.scss';

// Types
import { TFile } from '@/utils/types';

export const File = ({ name, extension, size, url, className }: TFile) => {
  const onDownload = () => {
    console.log('Descargando archivo');
  };

  return (
    <div className={`${s.file__container} ${className}`}>
      <div className={s.file}>
        <div className={s.file__content}>
          <div className={s.file__content__icon}>
            <Image
              src={`/icons/Files/${extension}.svg`}
              alt="Icono de archivo"
              width={30}
              height={30}
            />
            <p className={s.file__content__icon__extension}>.{extension}</p>
          </div>

          <div className={s.file__content__actions}>
            <a href={url} target="_blank" download={name}>
              <div
                className={s.file__content__actions__item}
                onClick={onDownload}
              >
                <Image
                  src="/icons/Actions/link.svg"
                  alt="Acciones"
                  width={30}
                  height={30}
                />
              </div>
              <p className={s.file__content__actions__size}>{size}</p>
            </a>
          </div>
        </div>
      </div>
      <div className={s.file__footer}>
        <p className={s.file__footer__name}>{name}</p>
      </div>
    </div>
  );
};
