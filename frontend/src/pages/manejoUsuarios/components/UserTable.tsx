// React
import { useState } from 'react';

// Next
import Link from 'next/link';

// Chakra UI Components
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tfoot,
} from '@chakra-ui/react';

// Chakra Icons
import {
  HamburgerIcon,
  CheckCircleIcon,
  WarningIcon,
  ExternalLinkIcon,
  EditIcon,
  ArrowForwardIcon,
  ArrowBackIcon,
} from '@chakra-ui/icons';

// Hooks
import { useAuthStore, useUiStore, useUsersStore } from '@/hooks';

// Local Components
import { Avatar, Select, Status } from '@/components/ui';

// Styles
import s from '../styles/manejoUsuarios.module.scss';

// Types
import { TUser } from '@/utils/types';

export default function UserTable() {
  const { currentUser } = useAuthStore();

  const { users, startInactiveUser, startLoadingUsers, setActiveUser } =
    useUsersStore();

  const { openCloseDrawer } = useUiStore();

  // Pagination
  const [page, setPage] = useState(0);

  // user to show
  const [userToShow, setUserToShow] = useState(10);

  // Filter activities
  const filteredData = (users: TUser[]) => {
    return users.slice(page, page + userToShow);
  };

  // Pagination functions
  const nextPage = () => {
    if (page + userToShow >= users.length) {
      return;
    }
    setPage(page + userToShow);
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - userToShow);
    }
  };

  // Table headers
  const tableHeaders = ['NOMBRE', 'PROFESION', 'ROL DE CARGO', 'ESTADO'];
  return (
    <TableContainer>
      <Table variant="simple" fontFamily={'Inter, sans-serif'}>
        <Thead>
          <Tr>
            {tableHeaders.map((header) => (
              <Th key={header}>{header}</Th>
            ))}
            <Th
              style={{
                textAlign: 'center',
              }}
            >
              ACCIONES
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredData(users).map((user, index) => (
            <Tr key={index}>
              <Td
                style={{
                  paddingLeft: '10px',
                }}
              >
                <Avatar
                  name={`${user?.first_name} ${user?.last_name}`}
                  email={user?.email}
                  src={user?.img_profile}
                  size={40}
                  classNameImg={s.avatar}
                />
              </Td>
              <Td>{user?.profession}</Td>
              <Td>{user?.userRole.role_name}</Td>
              <Td>
                <Status status={user?.is_active} />
              </Td>
              <Td
                style={{
                  textAlign: 'center',
                }}
              >
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                  />
                  <MenuList>
                    {user?.user_id !== currentUser.uid && (
                      <>
                        <MenuItem
                          icon={
                            user?.is_active ? (
                              <CheckCircleIcon />
                            ) : (
                              <WarningIcon />
                            )
                          }
                          onClick={() => {
                            startInactiveUser(user);
                            startLoadingUsers();
                          }}
                        >
                          {user?.is_active
                            ? 'Marcar como Inactivo'
                            : 'Marcar como Activo'}
                        </MenuItem>

                        <MenuItem
                          icon={<EditIcon />}
                          onClick={() => {
                            setActiveUser(user);
                            openCloseDrawer();
                          }}
                        >
                          Editar Usuario
                        </MenuItem>
                      </>
                    )}

                    <Link href={`/perfil/${user?.user_id}`}>
                      <MenuItem icon={<ExternalLinkIcon />}>
                        Ver Perfil
                      </MenuItem>
                    </Link>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot>
          <Tr>
            <Td
              colSpan={1}
              style={{
                paddingLeft: '10px',
              }}
            >
              <Select
                placeholder="Mostrar"
                SelectType="secondary"
                value={userToShow}
                onChange={(e) => {
                  setUserToShow(Number(e.target.value));
                }}
                style={{
                  width: '80px',
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </Select>
            </Td>

            <Td colSpan={3}></Td>

            <Td
              colSpan={1}
              style={{
                textAlign: 'center',
              }}
            >
              <IconButton
                aria-label="Previous page"
                icon={<ArrowBackIcon />}
                variant="outline"
                onClick={prevPage}
              />

              <IconButton
                aria-label="Next page"
                icon={<ArrowForwardIcon />}
                variant="outline"
                onClick={nextPage}
                style={{
                  marginLeft: '8px',
                }}
              />
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
