import { useEffect } from 'react';

// Hooks
import { useForm, useUiStore, useVoluntariosStore } from '@/hooks';

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
  // Global state for drawer
  const { isDrawerOpen, openCloseDrawer } = useUiStore();

  const {
    activeVoluntario,
    loadingCreate,
    startSavingVoluntario,
    startLoadingVoluntarios,
    setActiveVoluntario,
  } = useVoluntariosStore();

  const { formState, onInputChange, onResetForm, setFormState } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    profession: '',
    document: '',
    phone: '',
    other_contact: '',
  });

  // OnSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formState).some((value) => value === '')) {
      toast.error('Todos los campos son obligatorios');
      // console.log(formState);
      return;
    }

    await startSavingVoluntario(formState);
    await startLoadingVoluntarios();
    openCloseDrawer();
    handleClearForm();
  };

  // Clear form
  const handleClearForm = () => {
    onResetForm();

    setActiveVoluntario(null);
  };

  // Set form state if activeVoluntario
  useEffect(() => {
    if (activeVoluntario !== null) {
      setFormState(activeVoluntario as any);
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
          className={s.voluntarios__createVoluntario}
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
                value={formState.first_name}
                onChange={onInputChange}
                className={s.voluntarios__createVoluntario__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Apellido"
                name="last_name"
                value={formState.last_name}
                onChange={onInputChange}
                className={s.voluntarios__createVoluntario__input}
              />

              <Input
                // disabled={!!activeVoluntario}
                readOnly={loadingCreate}
                inputType="secondary"
                type="email"
                title="Correo electrónico"
                name="email"
                value={formState.email}
                onChange={onInputChange}
                className={s.voluntarios__createVoluntario__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Profesión"
                name="profession"
                value={formState.profession}
                onChange={onInputChange}
                className={s.voluntarios__createVoluntario__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="number"
                title="Cedula"
                name="document"
                value={formState.document}
                onChange={onInputChange}
                className={s.voluntarios__createVoluntario__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="number"
                title="Contacto"
                name="phone"
                value={formState.phone}
                onChange={onInputChange}
                className={s.voluntarios__createVoluntario__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Otro contacto"
                name="other_contact"
                value={formState.other_contact}
                onChange={onInputChange}
                className={s.voluntarios__createVoluntario__input}
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
                className={s.voluntarios__createVoluntario__button__cancel}
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
