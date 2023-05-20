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
import { Category, Select } from '@/components/ui';

// Styles
import s from '../Productos.module.scss';

// Types
import { TProducto } from '@/utils/types';

export default function ProductosTable() {
  const { productos, setActiveProducto, startDeleteProducto } =
    useProductosStore();

  const { openCloseDrawer } = useUiStore();

  // Pagination
  const [page, setPage] = useState(0);

  // user to show
  const [userToShow, setUserToShow] = useState(10);

  // Filter activities
  const filteredData = (productos: TProducto[]) => {
    return productos.slice(page, page + userToShow);
  };

  // Pagination functions
  const nextPage = () => {
    if (page + userToShow >= productos.length) {
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
  const tableHeaders = ['PRODUCTO', 'CATEGORIA', 'TIPO', 'CANTIDAD MINIMA'];

  return (
    <TableContainer>
      <Table variant="simple" fontFamily={'Inter, sans-serif'}>
        <Thead>
          <Tr>
            {tableHeaders.map((header, index) => (
              <Th key={index}>{header}</Th>
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
          {productos.length === 0 ? (
            <Tr>
              <Td colSpan={5}>No hay productos registrados</Td>
            </Tr>
          ) : (
            filteredData(productos).map((producto) => (
              <Tr key={producto?.created_date}>
                <Td
                  style={{
                    paddingLeft: '5px',
                  }}
                >
                  {producto?.supply_name}
                </Td>

                <Td>
                  <div className={s.productos__table__category}>
                    {producto?.supplyCategory?.map((category, index) => {
                      return (
                        <Category
                          key={index}
                          category_name={category?.supply_category_name}
                        />
                      );
                    })}
                  </div>
                </Td>

                <Td>{producto?.supplyType?.supply_type_name}</Td>

                <Td
                  style={{
                    width: '150px',
                    // textAlign: 'center',
                  }}
                >
                  {producto?.min_quantity}
                </Td>

                <Td
                  style={{
                    width: '170px',

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
                          setActiveProducto(producto);
                          openCloseDrawer();
                        }}
                      >
                        Editar producto
                      </MenuItem>

                      <Divider />

                      <MenuItem
                        icon={<DeleteIcon color="red" />}
                        color="red"
                        onClick={() => {
                          startDeleteProducto(producto?.supply_id);
                        }}
                      >
                        Eliminar producto
                      </MenuItem>
                    </MenuList>
                  </Menu>
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
