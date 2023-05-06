import { useEffect, useState, FormEvent } from 'react';

// Hooks
import { useUiStore, useVoluntariosStore } from '@/hooks';

// Chakra UI Components
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

// Sonner notification
import { toast } from 'sonner';

// UI Local Components
import { Loader } from '@/components';
import { Button, Input } from '@/components/ui';

// Styles
import s from '../styles/Voluntarios.module.scss';

export default function VoluntariosDrawer() {
  const { isDrawerOpen, openCloseDrawer } = useUiStore();

  const {
    activeVoluntario,
    loadingCreate,
    startSavingVoluntario,
    startLoadingVoluntarios,
    setActiveVoluntario,
  } = useVoluntariosStore();

  const [formVoluntariosState, setFormVoluntariosState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    profession: '',
    document: '',
    phone: '',
    other_contact: '',
  });

  // onInputChange
  const onInputChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;

    setFormVoluntariosState({
      ...formVoluntariosState,
      [name]: value,
    });
  };

  // OnSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formVoluntariosState).some((value) => value === '')) {
      toast.error('Todos los campos son obligatorios');
      // console.log(formVoluntariosState);
      return;
    }

    await startSavingVoluntario(formVoluntariosState);
    await startLoadingVoluntarios();
    openCloseDrawer();
    handleClearForm();
  };

  // Clear form
  const handleClearForm = () => {
    setFormVoluntariosState({
      first_name: '',
      last_name: '',
      email: '',
      profession: '',
      document: '',
      phone: '',
      other_contact: '',
    });

    setActiveVoluntario(null);
  };

  useEffect(() => {
    if (activeVoluntario !== null) {
      setFormVoluntariosState(activeVoluntario as any);
    }
  }, [activeVoluntario]);

  return (
    <>
      <Button onClick={openCloseDrawer}>Crear voluntario</Button>
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={openCloseDrawer}
        size="sm"
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />

        <form
          className={s.voluntarios__createUser}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <DrawerContent>
            <DrawerCloseButton
              onClick={() => {
                handleClearForm();
              }}
            />

            <DrawerHeader borderBottomWidth="1px">
              {activeVoluntario ? 'Actualizar voluntario' : 'Crear voluntario'}
            </DrawerHeader>

            <DrawerBody>
              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Nombre"
                name="first_name"
                value={formVoluntariosState.first_name}
                onChange={onInputChange}
                className={s.voluntarios__createUser__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Apellido"
                name="last_name"
                value={formVoluntariosState.last_name}
                onChange={onInputChange}
                className={s.voluntarios__createUser__input}
              />

              <Input
                // disabled={!!activeVoluntario}
                readOnly={loadingCreate}
                inputType="secondary"
                type="email"
                title="Correo electrónico"
                name="email"
                value={formVoluntariosState.email}
                onChange={onInputChange}
                className={s.voluntarios__createUser__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Profesión"
                name="profession"
                value={formVoluntariosState.profession}
                onChange={onInputChange}
                className={s.voluntarios__createUser__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="number"
                title="Cedula"
                name="document"
                value={formVoluntariosState.document}
                onChange={onInputChange}
                className={s.voluntarios__createUser__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="number"
                title="Contacto"
                name="phone"
                value={formVoluntariosState.phone}
                onChange={onInputChange}
                className={s.voluntarios__createUser__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Otro contacto"
                name="other_contact"
                value={formVoluntariosState.other_contact}
                onChange={onInputChange}
                className={s.voluntarios__createUser__input}
                style={{ marginBottom: '20px' }}
              />

              <br />

              {loadingCreate && <Loader />}
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px" gap={2}>
              <Button
                type="button"
                buttonType="secondary"
                onClick={() => {
                  openCloseDrawer();
                  handleClearForm();
                }}
                className={s.voluntarios__createUser__button__cancel}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {activeVoluntario
                  ? 'Actualizar voluntario'
                  : 'Crear voluntario'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}
