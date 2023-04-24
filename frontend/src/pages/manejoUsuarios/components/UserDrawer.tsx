import { useEffect, useState, FormEvent } from 'react';

// Hooks
import { useUiStore, useUsersStore } from '@/hooks';

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
import { Button, Input, Select } from '@/components/ui';

// Styles
import s from '../styles/manejoUsuarios.module.scss';

export default function UserDrawer() {
  const { isUserDrawerOpen, openCloseUserDrawer } = useUiStore();

  const {
    activeUser,
    loadingCreate,
    startSavingUser,
    startLoadingUsers,
    setActiveUser,
  } = useUsersStore();

  const [formState, setFormState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    profession: '',
    userRole: {
      role_name: '',
      role_id: '',
      role_description: '',
    },
    user_role: '',
  });

  // onInputChange
  const onInputChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // OnSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formState).some((value) => value === '')) {
      toast.error('Todos los campos son obligatorios');
      // console.log(formState);
      return;
    }

    await startSavingUser(formState);
    startLoadingUsers();
    openCloseUserDrawer();
    handleClearForm();
  };

  // Clear form
  const handleClearForm = () => {
    setFormState({
      first_name: '',
      last_name: '',
      email: '',
      profession: '',
      userRole: {
        role_name: '',
        role_id: '',
        role_description: '',
      },
      user_role: '',
    });

    setActiveUser(null);
  };

  useEffect(() => {
    if (activeUser !== null) {
      setFormState(activeUser as any);
    }
  }, [activeUser]);

  return (
    <>
      <Button onClick={openCloseUserDrawer}>Crear usuario</Button>
      <Drawer
        isOpen={isUserDrawerOpen}
        placement="right"
        onClose={openCloseUserDrawer}
        size="sm"
      >
        <DrawerOverlay />

        <form
          className={s.manejoUsuarios__createUser}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <DrawerContent>
            <DrawerCloseButton />

            <DrawerHeader borderBottomWidth="1px">
              {activeUser ? 'Actualizar usuario' : 'Crear usuario'}
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
                className={s.manejoUsuarios__createUser__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Apellido"
                name="last_name"
                value={formState.last_name}
                onChange={onInputChange}
                className={s.manejoUsuarios__createUser__input}
              />

              <Input
                disabled={!!activeUser}
                readOnly={loadingCreate}
                inputType="secondary"
                type="email"
                title="Correo electrónico"
                name="email"
                value={formState.email}
                onChange={onInputChange}
                className={s.manejoUsuarios__createUser__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Profesión"
                name="profession"
                value={formState.profession}
                onChange={onInputChange}
                className={s.manejoUsuarios__createUser__input}
              />

              <Select
                readOnly={loadingCreate}
                disabled={activeUser?.userRole?.role_id === '1'}
                SelectType="secondary"
                title="Perfil profesional"
                name="user_role"
                value={
                  activeUser ? formState.userRole.role_id : formState?.user_role
                }
                onChange={onInputChange}
                className={s.manejoUsuarios__createUser__input}
              >
                <option value="">-- Seleccionar perfil --</option>
                <option value="1">Administrador</option>
                <option value="2">Personal de Bodega</option>
                <option value="3">Médico</option>
                <option value="4">Coordinador Logístico</option>
                <option value="5">Coordinador de Formación</option>
                <option value="6">Coordinador Operativo</option>
              </Select>

              <br />
              {loadingCreate && <Loader />}
            </DrawerBody>

            <DrawerFooter borderTopWidth="1px" gap={2}>
              <Button
                type="button"
                buttonType="secondary"
                onClick={() => {
                  openCloseUserDrawer();
                  handleClearForm();
                }}
                className={s.manejoUsuarios__createUser__button__cancel}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {activeUser ? 'Actualizar usuario' : 'Crear usuario'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}
