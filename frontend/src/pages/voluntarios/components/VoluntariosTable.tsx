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
  Divider,
} from '@chakra-ui/react';

// Chakra Icons
import {
  HamburgerIcon,
  CheckCircleIcon,
  WarningIcon,
  ChatIcon,
  EditIcon,
} from '@chakra-ui/icons';

// Hooks
import { useUiStore, useVoluntariosStore } from '@/hooks';

// Local Components
import { Status } from '@/components/ui';

export default function VoluntariosTable() {
  const {
    voluntarios,
    startInactiveVoluntario,
    startLoadingVoluntarios,
    setActiveVoluntario,
    startDeleteVoluntario,
  } = useVoluntariosStore();

  const { openCloseDrawer } = useUiStore();

  // Table headers
  const tableHeaders = [
    'NOMBRE',
    'CEDULA',
    'PROFESION',
    'CONTACTO',
    'OTRO CONTACTO',
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
          {voluntarios.map((voluntario, index) => (
            <Tr key={index}>
              <Td
                style={{
                  paddingLeft: '5px',
                }}
              >
                {voluntario?.first_name} {voluntario?.last_name}
              </Td>

              <Td>{voluntario?.document}</Td>

              <Td>{voluntario?.profession}</Td>

              <Td>{voluntario?.phone}</Td>

              <Td>{voluntario?.other_contact}</Td>

              <Td>
                <Status status={voluntario!.is_active} />
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
                    <MenuItem
                      icon={
                        voluntario?.is_active ? (
                          <CheckCircleIcon />
                        ) : (
                          <WarningIcon />
                        )
                      }
                      onClick={async () => {
                        await startInactiveVoluntario(voluntario);
                      }}
                    >
                      {voluntario?.is_active
                        ? 'Marcar como Inactivo'
                        : 'Marcar como Activo'}
                    </MenuItem>

                    <MenuItem
                      icon={<EditIcon />}
                      onClick={() => {
                        setActiveVoluntario(voluntario);
                        openCloseDrawer();
                      }}
                    >
                      Editar voluntario
                    </MenuItem>

                    {/* <Link href={`/perfil/${voluntario?.voluntario_id}`}> */}
                    <MenuItem icon={<ChatIcon />}>Hacer observaciones</MenuItem>
                    {/* </Link> */}

                    <Divider />

                    <MenuItem
                      icon={<EditIcon color="red" />}
                      color="red"
                      onClick={() => {
                        startDeleteVoluntario(voluntario?.direct_volunteer_id);
                      }}
                    >
                      Eliminar voluntario
                    </MenuItem>
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
