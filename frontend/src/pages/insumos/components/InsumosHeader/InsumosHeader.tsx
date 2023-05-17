// React

// Next
import Link from 'next/link';
import { useRouter } from 'next/router';

// Styles
import s from './InsumosHeader.module.scss';

function InsumosHeader() {
  const router = useRouter();

  const headerLinks = [
    { name: 'Inventario', url: '/insumos' },
    { name: 'Productos', url: '/insumos/productos' },
    { name: 'Caducados', url: '/insumos/productos/caducados' },
  ];

  return (
    <div className={s.insumosHeader}>
      {headerLinks.map((link) => (
        <Link
          href={link.url}
          key={link.name}
          className={`${s.insumosHeader__link} ${
            router.pathname === link.url && s.insumosHeader__link__active
          }`}
        >
          <p className={s.insumosHeader__link__text}>{link.name}</p>
        </Link>
      ))}
    </div>
  );
}

export default InsumosHeader;
