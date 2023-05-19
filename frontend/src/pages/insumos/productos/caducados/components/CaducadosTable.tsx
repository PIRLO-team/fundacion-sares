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
import { useUiStore, useProductosStore } from '@/hooks';

// UI Components
import { Select } from '@/components/ui';

// Styles
import s from '../Caducados.module.scss';

// Types
import { TInsumo, TProducto } from '@/utils/types';

export default function CaducadosTable() {
  const { expiredProductos, setActiveProducto, startDeleteProducto } =
    useProductosStore();

  const { openCloseDrawer } = useUiStore();

  // Pagination
  const [page, setPage] = useState(0);

  // user to show
  const [userToShow, setUserToShow] = useState(10);

  // Filter activities
  const filteredData = (expiredProductos: TInsumo[]) => {
    return expiredProductos.slice(page, page + userToShow);
  };

  // Pagination functions
  const nextPage = () => {
    if (page + userToShow >= expiredProductos.length) {
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
  const tableHeaders = [
    'ID',
    'PRODUCTO',
    'CATEGORIA',
    'CANTIDAD',
    'PROVEEDOR',
    'TIPO DE ADQUISICIÓN',
    'F. DE CADUCIDAD',
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
          {expiredProductos.length === 0 ? (
            <Tr>
              <Td colSpan={8}>No hay productos caducados</Td>
            </Tr>
          ) : (
            filteredData(expiredProductos).map((producto, index) => (
              <Tr key={index}>
                <Td
                  style={{
                    paddingLeft: '5px',
                  }}
                >
                  {producto?.supply_id}
                </Td>

                <Td>{producto?.supplyCategory?.supply_name}</Td>

                <Td>{producto?.categoryBySupply?.supply_category_name}</Td>

                <Td>{producto?.quantity}</Td>

                <Td>{producto?.providerSupply?.name}</Td>

                <Td>{producto?.acquisitionTypeSupply?.acquisition_name}</Td>

                <Td
                  style={{
                    width: '150px',
                    // textAlign: 'center',
                  }}
                >
                  {producto?.expiration_date}
                </Td>
              </Tr>
            ))
          )}
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
                // className={s.pagination__select}
                style={{
                  width: '80px',
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </Select>
            </Td>

            <Td colSpan={5}></Td>

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
