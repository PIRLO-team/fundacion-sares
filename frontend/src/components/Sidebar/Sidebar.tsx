// React

// Next
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Hooks
import { useAuthStore } from '@/hooks';

// UI Components
import { Avatar } from '../ui';

// Styles
import s from './Sidebar.module.scss';

export function Sidebar() {
  const router = useRouter();

  const { user } = useAuthStore();

  const sideBarLinks = [
    {
      name: 'Inicio',
      icon: '/icons/SidebarIcons/home.svg',
      alt: 'Inicio',
      link: '/',
      role: 'Todos',
    },
    {
      name: 'Proveedores',
      icon: '/icons/SidebarIcons/proveedores.svg',
      alt: 'Proveedores',
      link: '/proveedores',
      role: 'Todos',
    },
    {
      name: 'Insumos',
      icon: '/icons/SidebarIcons/insumos.svg',
      alt: 'Insumos',
      link: '/insumos',
      role: 'Todos',
    },
    {
      name: 'Manejo de usuarios',
      icon: '/icons/SidebarIcons/usuarios.svg',
      alt: 'Manejo de usuarios',
      link: '/manejoUsuarios',
      role: 'A',
    },
    {
      name: 'Volutarios Directos',
      icon: '/icons/SidebarIcons/voluntarios.svg',
      alt: 'Volutarios Directos',
      link: '/voluntarios',
      role: 'A',
    },
    {
      name: 'Solicitudes',
      icon: '/icons/SidebarIcons/solicitudes.svg',
      alt: 'Solicitudes',
      link: '/solicitudes',
      role: 'A',
    },
    {
      name: 'Botiquines',
      icon: '/icons/SidebarIcons/botiquines.svg',
      alt: 'Botiquines',
      link: '/botiquines',
      role: 'A',
    },
    {
      name: 'Eventos',
      icon: '/icons/SidebarIcons/eventos.svg',
      alt: 'Eventos',
      link: '/eventos',
      role: 'A',
    },
    {
      name: 'Registro de eventos',
      icon: '/icons/SidebarIcons/registros.svg',
      alt: 'Registro de eventos',
      link: '/registroEventos',
      role: 'A',
    },
    {
      name: 'Reporte de gastos',
      icon: '/icons/SidebarIcons/reportes.svg',
      alt: 'Reporte de gastos',
      link: '/reporteGastos',
      role: 'A',
    },
  ];

  return (
    <>
      <div className={s.sidebar}>
        <div className={s.sidebar__content}>
          <div className={s.sidebar__logo}>
            <Link href="/">
              <Image
                src="/logo/sares/logo_small_icon.png"
                alt="Logo"
                width={40}
                height={40}
                className={s.sidebar__logo__img}
              />
            </Link>
          </div>

          <ul className={s.sidebar__links}>
            {sideBarLinks.map((link, index) => (
              <Link href={link.link} key={index}>
                {link.role === 'Todos' && (
                  <li
                    className={`${s.sidebar__links__item} ${
                      router.pathname === link.link && `${s.active}`
                    }`}
                  >
                    <Image
                      src={link.icon}
                      alt={link.alt}
                      width={24}
                      height={24}
                    />
                  </li>
                )}

                {user.role === link.role && (
                  <li
                    className={`${s.sidebar__links__item} ${
                      router.pathname === link.link && `${s.active}`
                    }`}
                  >
                    <Image
                      src={link.icon}
                      alt={link.alt}
                      width={24}
                      height={24}
                    />
                  </li>
                )}
              </Link>
            ))}
          </ul>
        </div>

        <div className={s.sidebar__footer}>
          <Link href={`/perfil/${user.username}`}>
            <Avatar
              src={`https://source.boringavatars.com/marble/50/${user.username}`}
              size={45}
            />
          </Link>
        </div>
      </div>
    </>
  );
}
