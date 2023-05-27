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
  Textarea,
  Text,
} from '@chakra-ui/react';

// Sonner notification
import { toast } from 'sonner';

// UI Local Components
import { Loader } from '@/components';
import { Button, Input } from '@/components/ui';

// Styles
import s from '../styles/Voluntarios.module.scss';

// Types
import { TVoluntario } from '@/utils/types';

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
    observation: '',
  });

  // OnSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // dont allow empty fields except for observation
    if (
      !formState.first_name ||
      !formState.last_name ||
      !formState.email ||
      !formState.profession ||
      !formState.document ||
      !formState.phone
    ) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    if (formState.document.toString().length > 11) {
      toast.error('La cedula debe tener máximo 11 digitos');
      return;
    }

    if (formState.document.toString().length > 8) {
      toast.error('La cedula debe tener minimo 8 digitos');
      return;
    }

    if (formState.phone.toString().length > 10) {
      toast.error('El contacto debe tener máximo 10 digitos');
      return;
    }

    if (formState.phone.toString().length > 7) {
      toast.error('El contacto debe tener minimo 7 digitos');
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
      setFormState(activeVoluntario as TVoluntario);
    }
  }, [activeVoluntario]);

  return (
    <>
      <Button
        onClick={openCloseDrawer}
        className={s.voluntarios__createVoluntario__button}
      >
        Crear voluntario
      </Button>
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
                required
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Nombre*"
                name="first_name"
                maxLength={50}
                value={formState.first_name}
                onChange={onInputChange}
                className={s.voluntarios__createVoluntario__input}
              />

              <Input
                required
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Apellido*"
                name="last_name"
                maxLength={50}
                value={formState.last_name}
                onChange={onInputChange}
                className={s.voluntarios__createVoluntario__input}
              />

              <Input
                required
                readOnly={loadingCreate}
                inputType="secondary"
                type="email"
                title="Correo electrónico*"
                name="email"
                maxLength={250}
                value={formState.email}
                onChange={onInputChange}
                className={s.voluntarios__createVoluntario__input}
              />

              <Input
                required
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Profesión*"
                name="profession"
                maxLength={200}
                value={formState.profession}
                onChange={onInputChange}
                className={s.voluntarios__createVoluntario__input}
              />

              <Input
                required
                readOnly={loadingCreate}
                inputType="secondary"
                type="number"
                title="Cedula*"
                name="document"
                value={formState.document}
                onChange={onInputChange}
                className={s.voluntarios__createVoluntario__input}
              />

              <Input
                required
                readOnly={loadingCreate}
                inputType="secondary"
                type="number"
                title="Contacto*"
                name="phone"
                value={formState.phone}
                onChange={onInputChange}
                className={s.voluntarios__createVoluntario__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Otro contacto (opcional)"
                name="other_contact"
                maxLength={200}
                value={formState.other_contact}
                onChange={onInputChange}
                className={s.voluntarios__createVoluntario__input}
              />

              <Text
                style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  margin: '1.5rem 0px 1rem 0px',
                }}
              >
                Observaciones (opcional)
              </Text>
              <Textarea
                name="observation"
                value={formState?.observation}
                onChange={onInputChange}
                style={{
                  marginBottom: '20px',
                }}
                maxLength={250}
              />

              <div
                style={{
                  margin: '1rem',
                }}
              />

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
              <Button
                type="submit"
                className={s.voluntarios__createVoluntario__button__create}
              >
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
