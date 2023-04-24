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
} from '@chakra-ui/react';

// Chakra Icons
import {
  HamburgerIcon,
  CheckCircleIcon,
  WarningIcon,
  ExternalLinkIcon,
  EditIcon,
} from '@chakra-ui/icons';

// Hooks
import { useAuthStore, useUiStore, useUsersStore } from '@/hooks';

// Local Components
import { Avatar, Status } from '@/components/ui';

export default function UserTable() {
  const { currentUser } = useAuthStore();

  const { users, startInactiveUser, startLoadingUsers, setActiveUser } =
    useUsersStore();

  const { openCloseUserDrawer } = useUiStore();

  // Table headers
  const tableHeaders = [
    'NOMBRE',
    'PROFESION',
    'ROL DE CARGO',
    'ESTADO',
    'ACCIONES',
  ];
  return (
    <TableContainer>
      <Table variant="simple" fontFamily={'Inter, sans-serif'}>
        <Thead>
          <Tr>
            {tableHeaders.map((header) => (
              <Th key={header}>{header}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user) => (
            <Tr key={user.username}>
              <Td>
                <Avatar
                  name={`${user!.first_name} ${user!.last_name}`}
                  email={user!.email}
                  src={`https://source.boringavatars.com/marble/120/${user.username}`}
                  size={40}
                />
              </Td>
              <Td>{user.profession}</Td>
              <Td>{user.userRole.role_name}</Td>
              <Td>
                <Status status={user!.is_active} />
              </Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<HamburgerIcon />}
                    variant="outline"
                  />
                  <MenuList>
                    {user.user_id !== currentUser.uid && (
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
                          {user.is_active
                            ? 'Marcar como Inactivo'
                            : 'Marcar como Activo'}
                        </MenuItem>

                        <MenuItem
                          icon={<EditIcon />}
                          onClick={() => {
                            setActiveUser(user);
                            openCloseUserDrawer();
                          }}
                        >
                          Editar Usuario
                        </MenuItem>
                      </>
                    )}

                    <Link href={`/perfil/${user.user_id}`}>
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
      </Table>
    </TableContainer>
  );
}
