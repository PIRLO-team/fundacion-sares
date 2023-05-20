import { useEffect } from 'react';

// Hooks
import { useUiStore, useProveedoresStore, useForm } from '@/hooks';

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
import s from '../styles/Proveedores.module.scss';

export default function ProveedoresDrawer() {
  const { isDrawerOpen, openCloseDrawer } = useUiStore();

  const {
    activeProveedor,
    loadingCreate,
    startSavingProveedor,
    startLoadingProveedores,
    setActiveProveedor,
  } = useProveedoresStore();

  const { formState, onInputChange, onResetForm, setFormState } = useForm({
    name: '',
    email: '',
    nit: '',
    phone: '',
    other_contact: '',
  });

  // OnSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // dont allow empty fields except for other_contact
    if (
      !formState.name ||
      !formState.email ||
      !formState.nit ||
      !formState.phone
    ) {
      toast.error('Todos los campos son obligatorios');
      // console.log(formState);
      return;
    }

    if (formState.nit.length > 10) {
      toast.error('El NIT no puede tener más de 10 dígitos');
      return;
    }

    if (formState.phone.length > 10) {
      toast.error('El número de contacto no puede tener más de 10 dígitos');
      return;
    }

    await startSavingProveedor(formState);
    await startLoadingProveedores();
    openCloseDrawer();
    handleClearForm();
  };

  // Clear form
  const handleClearForm = () => {
    onResetForm();
    setActiveProveedor(null);
  };

  useEffect(() => {
    if (activeProveedor !== null) {
      setFormState(activeProveedor as any);
    }
  }, [activeProveedor]);

  return (
    <>
      <Button
        onClick={openCloseDrawer}
        className={s.proveedores__createProveedor__button}
      >
        Crear proveedor
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
          className={s.proveedores__createProveedor}
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
              {activeProveedor ? 'Actualizar proveedor' : 'Crear proveedor'}
            </DrawerHeader>

            <DrawerBody>
              <Input
                required
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Nombre de la organizacion*"
                name="name"
                value={formState.name}
                maxLength={75}
                onChange={onInputChange}
                className={s.proveedores__createProveedor__input}
              />

              <Input
                required
                readOnly={loadingCreate}
                inputType="secondary"
                type="email"
                title="Correo electrónico*"
                name="email"
                maxLength={50}
                value={formState.email}
                onChange={onInputChange}
                className={s.proveedores__createProveedor__input}
              />

              <Input
                required
                readOnly={loadingCreate}
                inputType="secondary"
                type="number"
                title="NIT*"
                name="nit"
                value={formState.nit}
                onChange={onInputChange}
                className={s.proveedores__createProveedor__input}
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
                className={s.proveedores__createProveedor__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Otro contacto (opcional)"
                name="other_contact"
                maxLength={50}
                value={formState.other_contact}
                onChange={onInputChange}
                className={s.proveedores__createProveedor__input}
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
                className={s.proveedores__createProveedor__button__cancel}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {activeProveedor ? 'Actualizar proveedor' : 'Crear proveedor'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}
