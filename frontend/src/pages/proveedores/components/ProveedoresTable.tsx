// Next

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
import { HamburgerIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';

// Hooks
import { useUiStore, useProveedoresStore } from '@/hooks';

// Styles
import s from '../styles/Proveedores.module.scss';

export default function ProveedoresTable() {
  const { proveedores, setActiveProveedor, startDeleteProveedor } =
    useProveedoresStore();

  const { openCloseDrawer } = useUiStore();

  // Table headers
  const tableHeaders = [
    'NOMBRE',
    'NIT',
    'CONTACTO',
    'OTRO CONTACTO',
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
          {proveedores.map((proveedor, index) => (
            <Tr key={index}>
              <Td
                style={{
                  paddingLeft: '5px',
                }}
              >
                {proveedor?.name}
                <br />
                <span className={s.proveedores__email}>{proveedor?.email}</span>
              </Td>

              <Td>{proveedor?.nit}</Td>

              <Td>{proveedor?.phone}</Td>

              <Td>{proveedor?.other_contact}</Td>

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
                      icon={<EditIcon />}
                      onClick={() => {
                        setActiveProveedor(proveedor);
                        openCloseDrawer();
                      }}
                    >
                      Editar proveedor
                    </MenuItem>

                    <Divider />

                    <MenuItem
                      icon={<DeleteIcon color="red" />}
                      color="red"
                      onClick={() => {
                        startDeleteProveedor(proveedor?.provider_id);
                      }}
                    >
                      Eliminar proveedor
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
