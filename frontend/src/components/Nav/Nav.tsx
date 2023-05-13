// Next
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Hooks
import { useAuthStore } from '@/hooks';

// Chakra UI
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

// Styles
import s from './Nav.module.scss';

export function Nav() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { currentUser, startLogout } = useAuthStore();

  const router = useRouter();

  const navLinks = [
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
      role: '1',
    },
    {
      name: 'Manejo de usuarios',
      icon: '/icons/SidebarIcons/usuarios.svg',
      alt: 'Manejo de usuarios',
      link: '/manejoUsuarios',
      role: '1',
    },
    {
      name: 'Volutarios Directos',
      icon: '/icons/SidebarIcons/voluntarios.svg',
      alt: 'Volutarios Directos',
      link: '/voluntarios',
      role: 'Todos',
    },
    {
      name: 'Botiquines',
      icon: '/icons/SidebarIcons/botiquines.svg',
      alt: 'Botiquines',
      link: '/botiquines',
      role: '1',
    },
    {
      name: 'Insumos',
      icon: '/icons/SidebarIcons/insumos.svg',
      alt: 'Insumos',
      link: '/insumos',
      role: 'Todos',
    },
  ];

  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        className={s.nav}
      >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Link href="/">
              <Box>
                <Image
                  src="/logo/sares/logo_small_icon.png"
                  alt="Logo"
                  width={35}
                  height={35}
                  priority
                />
              </Box>
            </Link>
          </HStack>
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar size={'sm'} src={currentUser.img_profile} />
              </MenuButton>
              <MenuList>
                <Link href={`/perfil/${currentUser.uid}`}>
                  <MenuItem
                    isDisabled={router.asPath === `/perfil/${currentUser.uid}`}
                    style={{
                      padding: '0.8rem',
                    }}
                  >
                    Mi Cuenta
                  </MenuItem>
                </Link>
                <MenuDivider />
                <MenuItem onClick={startLogout}>Cerrar Sesión</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4}>
            <Stack as={'nav'}>
              {navLinks.map((link) => (
                <Link key={link.link} href={link.link}>
                  {link.role === 'Todos' && (
                    <p
                      className={`${s.nav__item} ${
                        router.pathname === link.link && `${s.active}`
                      }`}
                    >
                      {link.name}
                    </p>
                  )}

                  {currentUser.role.role_id === link.role && (
                    <p
                      className={`${s.nav__item} ${
                        router.pathname === link.link && `${s.active}`
                      }`}
                    >
                      {link.name}
                    </p>
                  )}
                </Link>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
