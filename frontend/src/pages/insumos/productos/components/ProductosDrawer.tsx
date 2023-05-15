import { useEffect, useState } from 'react';

// Hooks
import { useUiStore, useProductosStore, useForm } from '@/hooks';

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
import s from '../Productos.module.scss';

// Types
interface IFormState {
  supply_name: string;
  supply_type_id: string;
  min_quantity: string;
  supplyCategory: {
    supply_category_name: string;
  }[];
}

export default function ProductosDrawer() {
  const { isDrawerOpen, openCloseDrawer } = useUiStore();
  const [category, setCategory] = useState<string>('');

  const {
    productos,
    productCreated,
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
    min_quantity: '',
    supplyCategory: [
      {
        supply_category_name: '',
      },
    ],
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
      // console.log(formState);
      return;
    }

    await startSavingProducto(formState);
    await startLoadingProductos();
    // openCloseDrawer();
    // handleClearForm();

    console.log(formState);
  };

  // Clear form
  const handleClearForm = () => {
    setFormState({
      supply_name: '',
      supply_type_id: '',
      min_quantity: '',
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
      formState.supplyCategory.some((t) => t.supply_category_name === category)
    ) {
      toast.error('La categoria ya existe');
      return;
    }

    // trim

    setFormState({
      ...formState,
      supplyCategory: [
        ...formState.supplyCategory,
        { supply_category_name: category },
      ],
    });

    setCategory('');
  };

  const onCategoryDeleteClick = (category: string) => {
    setFormState({
      ...formState,
      supplyCategory: formState.supplyCategory.filter(
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
      <Button onClick={openCloseDrawer}>Crear productos</Button>
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
                readOnly={loadingCreate}
                inputType="secondary"
                type="text"
                title="Nombre del producto"
                name="supply_name"
                value={formState?.supply_name}
                onChange={onInputChange}
                className={s.productos__createProducto__input}
              />

              <Select
                title="Tipo de producto"
                name="supply_type_id"
                SelectType="secondary"
                value={formState?.supply_type_id}
                onChange={onInputChange}
              >
                <option value=""> -- Elegir tipo de producto -- </option>
                <option value="1">Consumible</option>
                <option value="2">Medicamento</option>
              </Select>

              <Input
                readOnly={loadingCreate}
                inputType="secondary"
                type="number"
                title="Cantidad minima"
                name="min_quantity"
                value={formState?.min_quantity}
                onChange={onInputChange}
                className={s.productos__createProducto__input}
              />

              {productCreated && (
                <>
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

                    <Button
                      type="button"
                      buttonType="secondary"
                      onClick={onCategoryAddClick}
                    >
                      Agregar categoria
                    </Button>
                  </div>

                  <div>
                    {formState.supplyCategory.length === 0 ? (
                      <p>Aun no hay categorias</p>
                    ) : (
                      formState.supplyCategory.map((category) => (
                        <div
                          key={category.supply_category_name}
                          onClick={() =>
                            onCategoryDeleteClick(category.supply_category_name)
                          }
                        >
                          <p>{category.supply_category_name}</p>
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
              <Button type="submit">
                {activeProducto ? 'Actualizar insumo' : 'Crear insumo'}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
}
