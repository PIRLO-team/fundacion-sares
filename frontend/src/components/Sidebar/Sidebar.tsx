// React

// Next
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Chakra UI
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Tooltip,
} from '@chakra-ui/react';

// Hooks
import { useAuthStore } from '@/hooks';

// UI Components
import { Avatar } from '../ui';

// Styles
import s from './Sidebar.module.scss';

export function Sidebar() {
  const router = useRouter();

  const { currentUser, startLogout } = useAuthStore();

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
      icon: '/icons/SidebarIcons/proveedores.png',
      alt: 'Proveedores',
      link: '/proveedores',
      role: ['1'],
    },
    {
      name: 'Manejo de usuarios',
      icon: '/icons/SidebarIcons/usuarios.svg',
      alt: 'Manejo de usuarios',
      link: '/manejoUsuarios',
      role: ['1'],
    },
    {
      name: 'Volutarios Directos',
      icon: '/icons/SidebarIcons/voluntarios.svg',
      alt: 'Volutarios Directos',
      link: '/voluntarios',
      role: ['1', '3', '6'],
    },
    {
      name: 'Botiquines',
      icon: '/icons/SidebarIcons/botiquines.svg',
      alt: 'Botiquines',
      link: '/botiquines',
      role: ['1', '2', '3', '4', '6'],
    },
    {
      name: 'Insumos',
      icon: '/icons/SidebarIcons/insumos.svg',
      alt: 'Insumos',
      link: '/insumos',
      role: ['1', '2', '4', '5'],
    },
  ];

  const sidebarLinksFiltered = sideBarLinks.filter((link) => {
    if (link.role === 'Todos') {
      return link;
    }

    if (link.role.includes(currentUser.role.role_id as string)) {
      return link;
    }
  });

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
            {sidebarLinksFiltered.map((link, index) => (
              <Tooltip label={link.name} placement="right" key={index}>
                <Link href={link.link}>
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
                      className={s.sidebar__links__item__icon}
                    />
                  </li>
                </Link>
              </Tooltip>
            ))}
          </ul>
        </div>

        <div className={s.sidebar__footer}>
          <Menu>
            <MenuButton>
              <Avatar
                src={currentUser.img_profile}
                size={45}
                classNameImg={s.sidebar__footer__avatar__img}
              />
            </MenuButton>
            <MenuList
              style={{
                padding: '0.5rem 0.5rem',
                borderRadius: '0.5rem',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
              }}
            >
              <Link href={`/perfil/${currentUser.uid}`}>
                <MenuItem
                  isDisabled={router.asPath === `/perfil/${currentUser.uid}`}
                  style={{
                    borderRadius: '5px',
                  }}
                >
                  Mi cuenta
                </MenuItem>
              </Link>

              <MenuDivider />

              <MenuItem
                onClick={startLogout}
                style={{
                  color: '#E53E3E',
                  fontWeight: 500,
                  backgroundColor: '#FEE2E2',
                  borderRadius: '5px',
                }}
              >
                Cerrar sesión
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </>
  );
}
