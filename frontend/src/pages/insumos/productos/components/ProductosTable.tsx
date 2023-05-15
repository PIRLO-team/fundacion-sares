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
import { useUiStore, useProductosStore } from '@/hooks';

// Styles
import s from '../Productos.module.scss';

export default function ProductosTable() {
  const { productos, setActiveProducto, startDeleteProducto } =
    useProductosStore();

  const { openCloseDrawer } = useUiStore();

  // Table headers
  const tableHeaders = [
    'PRODUCTO',
    'CATEGORIA',
    'TIPO',
    'CANTIDAD MINIMA',
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
          {productos.map((producto, index) => (
            <Tr key={index}>
              <Td
                style={{
                  paddingLeft: '5px',
                }}
              >
                {producto?.supply_name}
              </Td>

              <Td>
                <div className={s.productos__table__category}>
                  {producto?.supplyCategory.map((category) => {
                    return (
                      <p key={category.supply_category_id}>
                        {category.supply_category_name}
                      </p>
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
                  // textAlign: 'center',
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
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
