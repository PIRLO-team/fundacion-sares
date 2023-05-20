import { useEffect, useState } from 'react';

// Hooks
import { useUiStore, useProductosStore } from '@/hooks';

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
import { Button, Category, Input, Select } from '@/components/ui';

// Styles
import s from '../Productos.module.scss';

// Types
interface IFormState {
  supply_name: string;
  supply_type_id: string;
  min_quantity: number;
  supplyCategory: {
    supply_category_name: string;
    quantity: number;
  }[];
}

export default function ProductosDrawer() {
  const { isDrawerOpen, openCloseDrawer } = useUiStore();
  const [category, setCategory] = useState<string>('');

  const {
    activeProducto,
    loadingCreate,
    setProductCreated,
    startSavingProducto,
    startLoadingProductos,
    setActiveProducto,
  } = useProductosStore();

  const [formState, setFormState] = useState({
    supply_name: '',
    supply_type_id: '',
    min_quantity: 10,
    supplyCategory: [],
  } as IFormState);

  // OnInputChange
  const onInputChange = (
    e: React.FormEvent<HTMLInputElement | HTMLSelectElement>
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
      return;
    }

    await startSavingProducto({
      ...formState,
      min_quantity: Number(formState.min_quantity),
    });

    await startLoadingProductos();
    // openCloseDrawer();
    // handleClearForm();
  };

  // Clear form
  const handleClearForm = () => {
    setFormState({
      supply_name: '',
      supply_type_id: '',
      min_quantity: 10,
      supplyCategory: [],
    });

    setActiveProducto(null);
  };

  const onCategoryInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setCategory(value);
  };

  const onCategoryAddClick = () => {
    if (category === '') {
      toast.error('Debes ingresar una categoria');
      return;
    }

    if (
      formState?.supplyCategory?.some(
        (t) => t.supply_category_name === category
      )
    ) {
      toast.error('La categoria ya existe');
      return;
    }

    setFormState({
      ...formState,
      supplyCategory: [
        ...formState?.supplyCategory,
        { supply_category_name: category, quantity: 10 },
      ],
    });

    setCategory('');
  };

  const onCategoryDeleteClick = (category: string) => {
    setFormState({
      ...formState,
      supplyCategory: formState?.supplyCategory?.filter(
        (t) => t.supply_category_name !== category
      ),
    });
  };

  useEffect(() => {
    if (activeProducto !== null) {
      setFormState(activeProducto as any);
      setProductCreated(true);
    }
  }, [activeProducto]);

  return (
    <>
      <Button onClick={openCloseDrawer} className={s.productos__header__button}>
        Crear productos
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
          className={s.productos__createProducto}
          onSubmit={handleSubmit}
          autoComplete="off"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
            }
          }}
        >
          <DrawerContent>
            <DrawerCloseButton
              onClick={() => {
                handleClearForm();
              }}
            />

            <DrawerHeader borderBottomWidth="1px">
              {activeProducto ? 'Actualizar insumo' : 'Crear insumo'}
            </DrawerHeader>

            <DrawerBody>
              <Input
                required
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Nombre del producto*"
                name="supply_name"
                maxLength={75}
                value={formState?.supply_name}
                onChange={onInputChange}
                className={s.productos__createProducto__input}
              />

              <Select
                required
                title="Tipo de producto*"
                name="supply_type_id"
                SelectType="secondary"
                value={formState?.supply_type_id}
                onChange={onInputChange}
                className={s.productos__createProducto__input}
              >
                <option value=""> -- Elegir tipo de producto -- </option>
                <option value="1">Consumible</option>
                <option value="2">Medicamento</option>
              </Select>

              <Input
                required
                readOnly={loadingCreate}
                inputType="secondary"
                type="number"
                title="Cantidad minima*"
                name="min_quantity"
                value={formState?.min_quantity}
                onChange={onInputChange}
                className={s.productos__createProducto__input}
              />

              {activeProducto && (
                <>
                  <div className={s.productos__createProducto__category}>
                    <div>
                      <Input
                        readOnly={loadingCreate}
                        inputType="secondary"
                        type="text"
                        title="Categorias"
                        value={category}
                        onChange={onCategoryInputChange}
                        className={s.productos__createProducto__input}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            onCategoryAddClick();
                          }
                        }}
                      />
                    </div>

                    <Button
                      type="button"
                      onClick={onCategoryAddClick}
                      className={s.productos__createProducto__category__button}
                    >
                      Agregar
                    </Button>
                  </div>

                  <div
                    className={
                      s.productos__createProducto__category__categories
                    }
                  >
                    {formState?.supplyCategory?.length === 0 ? (
                      <p>Aun no hay categorias</p>
                    ) : (
                      formState?.supplyCategory?.map((category, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            onCategoryDeleteClick(category.supply_category_name)
                          }
                          className={
                            s.productos__createProducto__category__item
                          }
                        >
                          <Category
                            category_name={category.supply_category_name}
                          />
                        </div>
                      ))
                    )}
                  </div>
                </>
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
                className={s.productos__createProducto__button__cancel}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className={s.productos__createProducto__button__create}
              >
                {activeProducto ? 'Actualizar insumo' : 'Crear insumo'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}
