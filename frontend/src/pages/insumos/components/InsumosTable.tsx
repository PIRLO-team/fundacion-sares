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
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react';

// Chakra Icons
import {
  HamburgerIcon,
  EditIcon,
  DeleteIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
  InfoIcon,
  ArrowLeftIcon,
} from '@chakra-ui/icons';

// Hooks
import { useUiStore, useInsumosStore } from '@/hooks';

// Local Components
import InsumosDiscountModal from './InsumosDiscountModal';

// UI Components
import { Select } from '@/components/ui';

// Types
import { TInsumo } from '@/utils/types';

export default function InsumosTable() {
  const { insumos, setActiveInsumo, startDeleteInsumo, startDiscountInsumo } =
    useInsumosStore();

  const { openCloseDrawer } = useUiStore();

  // Discount modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // insumoSelected
  const [insumo, setInsumo] = useState({
    supply_id: '',
    stock: '',
  });

  // Pagination
  const [page, setPage] = useState(0);

  // number to show
  const [numberToShow, setNumberToShow] = useState(10);

  // Filter activities
  const filteredData = (insumos: TInsumo[]) => {
    return insumos.slice(page, page + numberToShow);
  };

  // Pagination functions
  const nextPage = () => {
    if (page + numberToShow >= insumos.length) {
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
  const tableHeaders = [
    'ID',
    'PRODUCTO',
    'CATEGORIA',
    'CANTIDAD',
    'PROVEEDOR',
    'TIPO DE ADQUISICIÓN',
    'FECHA DE CADUCIDAD',
  ];
  return (
    <>
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
            {filteredData(insumos).map((insumo, index) => (
              <Tr key={index}>
                <Td
                  style={{
                    paddingLeft: '10px',
                  }}
                >
                  {insumo?.supply_id}
                </Td>

                <Td
                  style={{
                    paddingLeft: '10px',
                  }}
                >
                  {insumo?.supplyCategory?.supply_name}
                </Td>

                <Td>{insumo?.categoryBySupply?.supply_category_name}</Td>

                <Td>{insumo?.quantity}</Td>

                <Td>{insumo?.providerSupply?.name}</Td>

                <Td>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <p>{insumo?.acquisitionTypeSupply?.acquisition_name}</p>

                    {insumo?.acquisition_id === '2' && (
                      <Popover>
                        <PopoverTrigger>
                          <InfoIcon
                            style={{
                              cursor: 'pointer',
                            }}
                          />
                        </PopoverTrigger>

                        <PopoverContent>
                          <PopoverArrow />
                          <PopoverBody
                            style={{
                              textAlign: 'center',
                              whiteSpace: 'pre-wrap',
                            }}
                          >
                            {insumo?.agreement}
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </Td>

                <Td>{insumo?.expiration_date}</Td>

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
                          setActiveInsumo(insumo);
                          openCloseDrawer();
                        }}
                      >
                        Editar insumo
                      </MenuItem>

                      <Divider />

                      <MenuItem
                        icon={<ArrowLeftIcon />}
                        onClick={() => {
                          onOpen();
                          setInsumo({
                            supply_id: insumo?.supply_id,
                            stock: insumo?.quantity,
                          });
                        }}
                      >
                        Descontar
                      </MenuItem>

                      <Divider />

                      <MenuItem
                        icon={<DeleteIcon color="red" />}
                        color="red"
                        onClick={() => {
                          startDeleteInsumo(insumo?.supply_id);
                        }}
                      >
                        Eliminar insumo
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
                    width: '80px',
                  }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </Select>
              </Td>

              <Td colSpan={6}></Td>

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

      <InsumosDiscountModal isOpen={isOpen} onClose={onClose} insumo={insumo} />
    </>
  );
}
