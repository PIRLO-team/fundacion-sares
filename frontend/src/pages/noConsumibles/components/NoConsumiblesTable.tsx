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
  ArrowLeftIcon,
  CheckIcon,
  CloseIcon,
  InfoIcon,
} from '@chakra-ui/icons';

// Hooks
import { useUiStore, useNoConsumiblesStore } from '@/hooks';

// UI Components
import NoConsumiblesDiscountModal from './NoConsumiblesDiscountModal';
import { Select, Status } from '@/components/ui';

// Styles

// Types
import { TNoConsumible } from '@/utils/types';

export default function InsumosTable() {
  const { noConsumibles, setActiveNoConsumible, startDeleteNoConsumible } =
    useNoConsumiblesStore();

  const { openCloseDrawer } = useUiStore();

  // Discount modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // insumoSelected
  const [noConsumible, setNoConsumible] = useState({
    non_consumable_id: '',
  });

  // Pagination
  const [page, setPage] = useState(0);

  // number to show
  const [numberToShow, setNumberToShow] = useState(10);

  // Filter activities
  const filteredData = (noConsumibles: TNoConsumible[]) => {
    return noConsumibles.slice(page, page + numberToShow);
  };

  // Pagination functions
  const nextPage = () => {
    if (page + numberToShow >= noConsumibles.length) {
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
    'NO CONSUMIBLE',
    'PROVEEDOR',
    'TIPO DE ADQUISICIÓN',
    'SE ESTERILIZA',
    'ESTADO',
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
            {filteredData(noConsumibles).map((noConsumible, index) => (
              <Tr key={index}>
                <Td
                  style={{
                    paddingLeft: '10px',
                  }}
                >
                  {noConsumible?.non_consumable_id}
                </Td>

                <Td
                  style={{
                    paddingLeft: '10px',
                  }}
                >
                  {
                    noConsumible?.nonConsumableCategory
                      ?.non_consumable_category_supply_name
                  }
                </Td>

                <Td>{noConsumible?.providerNonConsumable?.name}</Td>

                <Td>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                  >
                    <p>
                      {
                        noConsumible?.acquisitionTypeNonConsumable
                          ?.acquisition_name
                      }
                    </p>

                    {noConsumible?.acquisition_id === '2' && (
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
                            {noConsumible?.agreement}
                          </PopoverBody>
                        </PopoverContent>
                      </Popover>
                    )}
                  </div>
                </Td>

                <Td
                  style={{
                    paddingLeft: '50px',
                  }}
                >
                  {noConsumible?.nonConsumableCategory
                    ?.non_consumable_status_id === '1' ? (
                    <CheckIcon color="green" />
                  ) : (
                    <CloseIcon color="red" />
                  )}
                </Td>

                <Td>
                  <Status status={noConsumible?.is_active} />
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
                      <MenuItem
                        icon={<EditIcon />}
                        onClick={() => {
                          setActiveNoConsumible(noConsumible);
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
                          setNoConsumible({
                            non_consumable_id: noConsumible?.non_consumable_id,
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
                          startDeleteNoConsumible(
                            noConsumible?.non_consumable_id
                          );
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

      <NoConsumiblesDiscountModal
        isOpen={isOpen}
        onClose={onClose}
        noConsumible={noConsumible}
      />
    </>
  );
}
