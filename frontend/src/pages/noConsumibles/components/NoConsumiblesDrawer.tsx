import { useEffect } from 'react';

// Hooks
import {
  useUiStore,
  useForm,
  useProveedoresStore,
  useNoConsumiblesStore,
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
import s from '../styles/NoConsumibles.module.scss';

// Types
import { TCategories, TNoConsumible } from '@/utils/types';

export default function InsumosDrawer() {
  const { isDrawerOpen, openCloseDrawer } = useUiStore();

  const { proveedores } = useProveedoresStore();

  const {
    categories,
    activeNoConsumible,
    loadingCreate,
    startSavingNoConsumible,
    startLoadingNoConsumible,
    setActiveNoConsumible,
  } = useNoConsumiblesStore();

  const { formState, onInputChange, onResetForm, setFormState } = useForm({
    non_consumable_category_supply_id: '',
    provider_id: '',
    acquisition_id: '',
    agreement: ' ',
  });

  // OnSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // show error if any field is empty except agreement

    if (
      Object.values(formState).some((value) => value === '' && value !== '') ||
      formState.non_consumable_category_supply_id === '' ||
      formState.provider_id === '' ||
      formState.acquisition_id === ''
    ) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    await startSavingNoConsumible(formState);
    await startLoadingNoConsumible();
    openCloseDrawer();
    handleClearForm();
  };

  // Clear form
  const handleClearForm = () => {
    onResetForm();
    setActiveNoConsumible(null);
  };

  useEffect(() => {
    if (activeNoConsumible !== null) {
      setFormState(activeNoConsumible as TNoConsumible);
    }
  }, [activeNoConsumible]);

  return (
    <>
      <Button
        onClick={openCloseDrawer}
        className={s.noConsumibles__createNoConsumible__button}
      >
        Crear insumo
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
          className={s.noConsumibles__createNoConsumible}
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
              {activeNoConsumible ? 'Actualizar insumo' : 'Crear insumo'}
            </DrawerHeader>

            <DrawerBody>
              {!activeNoConsumible && (
                <Select
                  required
                  title="Tipo de producto*"
                  name="non_consumable_category_supply_id"
                  SelectType="secondary"
                  value={formState?.non_consumable_category_supply_id}
                  onChange={onInputChange}
                >
                  <option value="">-- Elegir tipo de insumo --</option>
                  {categories.map((insumo: TCategories) => (
                    <option
                      key={insumo.non_consumable_category_supply_id}
                      value={insumo.non_consumable_category_supply_id}
                    >
                      {insumo.non_consumable_category_supply_name}
                    </option>
                  ))}
                </Select>
              )}

              <Select
                required
                title="Proveedor*"
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
                required
                title="Tipo de adquisición*"
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
                  maxLength={250}
                  value={formState?.agreement}
                  onChange={onInputChange}
                  className={s.noConsumibles__createNoConsumible__input}
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
                className={s.noConsumibles__createNoConsumible__button__cancel}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className={s.noConsumibles__createNoConsumible__button__create}
              >
                {activeNoConsumible ? 'Actualizar insumo' : 'Crear insumo'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}
