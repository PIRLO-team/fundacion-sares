// React
import { useState } from 'react';

// Next

// Redux hooks
import { useAppDispatch, useAppSelector } from '@/store/app/hooks';

// Store actions
import {
  onAddNewProducto,
  onLoadExpireProductos,
  onLoadProductos,
  onSetActiveProducto,
  onSetLoadingProductos,
  onUpdateProducto,
} from '@/store';

// Notifications
import { toast } from 'sonner';

// Axios instance
import { projectApi } from '@/api';

// Types
import { TInsumo, TProducto } from '@/utils/types/';

export const useProductosStore = () => {
  const { productos, expiredProductos, activeProducto, loading } =
    useAppSelector((state) => state.productos);

  // Dispatch
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>();

  const [productCreated, setProductCreated] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);

  // Get productos
  const startLoadingProductos = async () => {
    dispatch(onSetLoadingProductos(true));

    try {
      const { data } = await projectApi.get('/api/supply/all-categories');

      dispatch(onLoadProductos(data.response));
    } catch (error: any) {
      dispatch(onSetLoadingProductos(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Get expired productos
  const startLoadingExpiredProductos = async () => {
    dispatch(onSetLoadingProductos(true));

    try {
      const { data } = await projectApi.get('/api/supply/expired');

      dispatch(onLoadExpireProductos(data.response));
    } catch (error: any) {
      dispatch(onSetLoadingProductos(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Set active producto
  const setActiveProducto = (producto: TProducto | TInsumo | null) => {
    dispatch(onSetActiveProducto(producto));
  };

  // Saving producto
  const startSavingProducto = async (productoForm: any) => {
    setLoadingCreate(true);

    try {
      if (productoForm.supply_id) {
        // Update producto
        await projectApi.patch(
          `/api/supply/update-supply-category/${productoForm.supply_id}`,
          productoForm
        );

        dispatch(onUpdateProducto(productoForm));
        setLoadingCreate(false);

        // update producto notification
        toast.success('Producto actualizado con éxito');
        return;
      }

      // Create activity
      const { data } = await projectApi.post(
        '/api/supply/create-supply-category',
        productoForm
      );
      dispatch(
        onAddNewProducto({
          ...productoForm,
        })
      );

      setLoadingCreate(false);
      setActiveProducto(data.response);

      toast.message(data.title, {
        description: data.message,
      });

      //
    } catch (error: any) {
      dispatch(onSetLoadingProductos(false));
      setLoadingCreate(false);
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // producto by id
  const startGetProductoById = async (supply_id: string) => {
    dispatch(onSetLoadingProductos(true));

    try {
      const { data } = await projectApi.get(
        `/api/supply/category/${supply_id}`
      );

      dispatch(onSetActiveProducto(data.response));
      dispatch(onSetLoadingProductos(false));
    } catch (error: any) {
      dispatch(onSetLoadingProductos(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Delete Producto
  const startDeleteProducto = async (supply_id: string) => {
    dispatch(onSetLoadingProductos(true));

    try {
      await projectApi.delete(
        `/api/supply/delete/supply-category/${supply_id}`
      );

      await startLoadingProductos();
      dispatch(onSetLoadingProductos(false));

      toast.success('Producto eliminado con éxito');
    } catch (error: any) {
      dispatch(onSetLoadingProductos(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  return {
    // Properties
    productos,
    expiredProductos,
    activeProducto,
    loading,
    loadingCreate,
    productCreated,
    error,

    // Methods
    setProductCreated,
    setActiveProducto,
    startLoadingProductos,
    startLoadingExpiredProductos,
    startSavingProducto,
    startGetProductoById,
    startDeleteProducto,
  };
};
