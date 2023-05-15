// React
import { useState } from 'react';

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
  Tfoot,
} from '@chakra-ui/react';

// Chakra Icons
import {
  HamburgerIcon,
  EditIcon,
  DeleteIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';

// Hooks
import { useUiStore, useProveedoresStore } from '@/hooks';

// UI Components
import { Select } from '@/components/ui';

// Styles
import s from '../styles/Proveedores.module.scss';

// Types
import { TProveedor } from '@/utils/types';

export default function ProveedoresTable() {
  const { proveedores, setActiveProveedor, startDeleteProveedor } =
    useProveedoresStore();

  const { openCloseDrawer } = useUiStore();

  // Pagination
  const [page, setPage] = useState(0);

  // number to show
  const [numberToShow, setNumberToShow] = useState(10);

  // Filter activities
  const filteredData = (proveedor: TProveedor[]) => {
    return proveedor.slice(page, page + numberToShow);
  };

  // Pagination functions
  const nextPage = () => {
    if (page + numberToShow >= proveedores.length) {
      return;
    }
    setPage(page + numberToShow);
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - numberToShow);
    }
  };

  // Table headers
  const tableHeaders = ['NOMBRE', 'NIT', 'CONTACTO', 'OTRO CONTACTO'];
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
          {filteredData(proveedores).map((proveedor, index) => (
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
                value={numberToShow}
                onChange={(e) => {
                  setNumberToShow(Number(e.target.value));
                }}
                // className={s.pagination__select}
                style={{
                  maxWidth: '80px',
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
