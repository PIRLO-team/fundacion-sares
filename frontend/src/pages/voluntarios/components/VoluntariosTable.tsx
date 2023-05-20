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
} from '@chakra-ui/react';

// Chakra Icons
import {
  HamburgerIcon,
  CheckCircleIcon,
  WarningIcon,
  ChatIcon,
  EditIcon,
  DeleteIcon,
  ArrowBackIcon,
  ArrowForwardIcon,
} from '@chakra-ui/icons';

// Hooks
import { useUiStore, useVoluntariosStore } from '@/hooks';

// Local Components
import { Select, Status } from '@/components/ui';
import VoluntariosObservationModal from './VoluntariosObservationModal';

// Styles
import s from '../styles/Voluntarios.module.scss';

// Types
import { TVoluntario } from '@/utils/types';

export default function VoluntariosTable() {
  const {
    voluntarios,
    startInactiveVoluntario,
    setActiveVoluntario,
    startDeleteVoluntario,
  } = useVoluntariosStore();

  const { openCloseDrawer } = useUiStore();

  // Pagination
  const [page, setPage] = useState(0);

  // number to show
  const [numberToShow, setNumberToShow] = useState(10);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [voluntario, setVoluntario] = useState<TVoluntario | null>(null);

  // Filter activities
  const filteredData = (voluntarios: TVoluntario[]) => {
    return voluntarios.slice(page, page + numberToShow);
  };

  // Pagination functions
  const nextPage = () => {
    if (page + numberToShow >= voluntarios.length) {
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
    'NOMBRE',
    'CEDULA',
    'PROFESION',
    'CONTACTO',
    'OTRO CONTACTO',
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
            {filteredData(voluntarios).map((voluntario, index) => (
              <Tr key={index}>
                <Td
                  style={{
                    paddingLeft: '5px',
                  }}
                >
                  {voluntario?.first_name} {voluntario?.last_name}
                  <br />
                  <span className={s.voluntarios__email}>
                    {voluntario?.email}
                  </span>
                </Td>

                <Td>{voluntario?.document}</Td>

                <Td>{voluntario?.profession}</Td>

                <Td>{voluntario?.phone}</Td>

                <Td>{voluntario?.other_contact}</Td>

                <Td>
                  <Status status={voluntario!.is_active} />
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

                      <MenuItem
                        icon={<ChatIcon />}
                        onClick={() => {
                          onOpen();
                          setVoluntario(voluntario);
                        }}
                      >
                        Hacer observaciones
                      </MenuItem>

                      <Divider />

                      <MenuItem
                        icon={<DeleteIcon color="red" />}
                        color="red"
                        onClick={() => {
                          startDeleteVoluntario(
                            voluntario?.direct_volunteer_id
                          );
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

      <VoluntariosObservationModal
        isOpen={isOpen}
        onClose={onClose}
        voluntario={voluntario}
        setVoluntario={setVoluntario}
      />
    </>
  );
}
