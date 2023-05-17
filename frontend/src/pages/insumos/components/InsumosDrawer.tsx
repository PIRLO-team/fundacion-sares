import { useEffect } from 'react';

// Hooks
import {
  useUiStore,
  useInsumosStore,
  useForm,
  useProductosStore,
  useProveedoresStore,
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

  const { proveedores } = useProveedoresStore();

  const {
    activeInsumo,
    loadingCreate,
    startSavingInsumo,
    startLoadingInsumos,
    setActiveInsumo,
  } = useInsumosStore();

  const { formState, onInputChange, onResetForm, setFormState } = useForm({
    supply_category_id: '',
    category_by_supply_id: '',
    provider_id: '',
    acquisition_id: '',
    agreement: '-',
    expiration_date: new Date().toISOString().split('T')[0],
    quantity: '',
  });

  // OnSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // show error if any field is empty except agreement

    if (
      Object.values(formState).some((value) => value === '' && value !== '') ||
      formState.supply_category_id === '' ||
      formState.category_by_supply_id === '' ||
      formState.provider_id === '' ||
      formState.acquisition_id === ''
    ) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    await startSavingInsumo(formState);
    await startLoadingInsumos();
    openCloseDrawer();
    handleClearForm();
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
              {!activeInsumo && (
                <Select
                  title="Tipo de producto"
                  name="supply_category_id"
                  SelectType="secondary"
                  value={formState?.supply_category_id}
                  onChange={onInputChange}
                >
                  <option value="">-- Elegir tipo de producto --</option>
                  {productos.map((producto) => (
                    <option key={producto.supply_id} value={producto.supply_id}>
                      {producto.supply_name}
                    </option>
                  ))}
                </Select>
              )}

              <Select
                title="Categoria"
                name="category_by_supply_id"
                SelectType="secondary"
                value={formState?.category_by_supply_id}
                onChange={onInputChange}
              >
                <option value="">-- Elegir tipo de producto --</option>
                {productos
                  .filter(
                    (product) =>
                      product.supply_id === formState.supply_category_id
                  )
                  .map((category) => {
                    return category.supplyCategory.map((category) => {
                      return (
                        <option
                          key={category.supply_category_id}
                          value={category.supply_category_id}
                        >
                          {category.supply_category_name}
                        </option>
                      );
                    });
                  })}
              </Select>

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="number"
                title="Cantidad"
                name="quantity"
                value={formState?.quantity}
                onChange={onInputChange}
                className={s.insumos__createInsumo__input}
              />

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="date"
                title="Fecha de vencimiento"
                name="expiration_date"
                value={formState?.expiration_date}
                onChange={onInputChange}
                className={s.insumos__createInsumo__input}
              />

              <Select
                title="Proveedor"
                name="provider_id"
                SelectType="secondary"
                value={formState?.provider_id}
                onChange={onInputChange}
              >
                <option value="">-- Elegir proveedor --</option>

                {proveedores?.map((proveedor) => (
                  <option
                    key={proveedor.provider_id}
                    value={proveedor.provider_id}
                  >
                    {proveedor.name}
                  </option>
                ))}
              </Select>

              <Select
                title="Tipo de adquisición"
                name="acquisition_id"
                SelectType="secondary"
                value={formState?.acquisition_id}
                onChange={onInputChange}
              >
                <option value="">-- Elegir tipo de adquisición --</option>
                <option value="1">Por compra</option>
                <option value="2">Intercambio de bienes</option>
                <option value="3">Donativo</option>
              </Select>

              {formState?.acquisition_id === '2' && (
                <Input
                  readOnly={loadingCreate}
                  inputType="secondary"
                  type="text"
                  title="Acuerdo de intercambio"
                  name="agreement"
                  value={formState?.agreement}
                  onChange={onInputChange}
                  className={s.insumos__createInsumo__input}
                  style={{ marginBottom: '20px' }}
                />
              )}

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
              <Button
                type="submit"
                className={s.insumos__createInsumo__button__create}
              >
                {activeInsumo ? 'Actualizar' : 'Crear insumo'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}
