import { useEffect } from 'react';

// Hooks
import {
  useUiStore,
  useInsumosStore,
  useForm,
  useProductosStore,
} from '@/hooks';

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
import s from '../styles/Insumos.module.scss';

export default function InsumosDrawer() {
  const { isDrawerOpen, openCloseDrawer } = useUiStore();

  const { productos } = useProductosStore();

  const {
    activeInsumo,
    loadingCreate,
    startSavingInsumo,
    startLoadingInsumos,
    setActiveInsumo,
  } = useInsumosStore();

  const { formState, onInputChange, onResetForm, setFormState } = useForm({
    supply_category_id: '',
    email: '',
    nit: '',
    phone: '',
    other_contact: '',
  });

  // OnSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // if (Object.values(formState).some((value) => value === '')) {
    //   toast.error('Todos los campos son obligatorios');
    //   // console.log(formState);
    //   return;
    // }

    // await startSavingInsumo(formState);
    // await startLoadingInsumos();
    // openCloseDrawer();
    // handleClearForm();

    console.log(formState);
  };

  // Clear form
  const handleClearForm = () => {
    onResetForm();
    setActiveInsumo(null);
  };

  useEffect(() => {
    if (activeInsumo !== null) {
      setFormState(activeInsumo as any);
    }
  }, [activeInsumo]);

  return (
    <>
      <Button onClick={openCloseDrawer}>Crear insumo</Button>
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={openCloseDrawer}
        size="sm"
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />

        <form
          className={s.insumos__createInsumo}
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
              {activeInsumo ? 'Actualizar insumo' : 'Crear insumo'}
            </DrawerHeader>

            <DrawerBody>
              <Select
                title="Tipo de producto"
                name="supply_category_id"
                SelectType="secondary"
                onChange={onInputChange}
              >
                {productos.map((producto) => (
                  <option key={producto.supply_id} value={producto.supply_id}>
                    {producto.supply_name}
                  </option>
                ))}
              </Select>

              <Select
                title="Tipo de producto"
                name="supply_category_id"
                SelectType="secondary"
                onChange={onInputChange}
              >
                {/* {productos?.map((producto) => (
                  <option key={producto.supply_id} value={producto.supply_id}>
                    {producto.supply_name}
                  </option>
                ))} */}
                <option value="">-- Elegir tipo de producto --</option>
              </Select>

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="email"
                title="Correo electrónico"
                name="email"
                value={formState.email}
                onChange={onInputChange}
                className={s.insumos__createInsumo__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="number"
                title="NIT"
                name="nit"
                value={formState.nit}
                onChange={onInputChange}
                className={s.insumos__createInsumo__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="number"
                title="Contacto"
                name="phone"
                value={formState.phone}
                onChange={onInputChange}
                className={s.insumos__createInsumo__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Otro contacto"
                name="other_contact"
                value={formState.other_contact}
                onChange={onInputChange}
                className={s.insumos__createInsumo__input}
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
                className={s.insumos__createInsumo__button__cancel}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {activeInsumo ? 'Actualizar insumo' : 'Crear insumo'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}
