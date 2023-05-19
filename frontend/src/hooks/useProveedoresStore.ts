// React
import { useState } from 'react';

// Next
// import { useRouter } from 'next/router';

// Redux hooks
import { useAppDispatch, useAppSelector } from '@/store/app/hooks';

// Store actions
import {
  onAddNewProveedor,
  onLoadProveedores,
  onSetActiveProveedor,
  onSetLoadingProveedores,
  onUpdateProveedor,
} from '@/store';

// Notifications
import { toast } from 'sonner';

// Axios instance
import { projectApi } from '@/api';

// Types
import { TProveedor } from '@/utils/types/';

export const useProveedoresStore = () => {
  const { proveedores, activeProveedor, loading } = useAppSelector(
    (state) => state.proveedores
  );

  // Dispatch
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>();
  const [loadingCreate, setLoadingCreate] = useState(false);

  // Get Users
  const startLoadingProveedores = async () => {
    dispatch(onSetLoadingProveedores(true));

    try {
      const { data } = await projectApi.get('/api/provider');

      dispatch(onLoadProveedores(data.response));
    } catch (error: any) {
      dispatch(onSetLoadingProveedores(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Set active user
  const setActiveProveedor = (user: TProveedor | null) => {
    dispatch(onSetActiveProveedor(user));
  };

  // Saving user
  const startSavingProveedor = async (userForm: any) => {
    setLoadingCreate(true);

    try {
      if (userForm.provider_id) {
        // Update user
        await projectApi.patch(
          `/api/provider/${userForm.provider_id}`,
          userForm
        );

        dispatch(onUpdateProveedor(userForm));
        setLoadingCreate(false);

        // update user notification
        toast.success('Proveedor actualizado con éxito');
        return;
      }

      // Create activity
      const { data } = await projectApi.post(
        '/api/provider/register',
        userForm
      );
      dispatch(
        onAddNewProveedor({
          ...userForm,
        })
      );
      setLoadingCreate(false);

      toast.message(data.title, {
        description: data.message,
      });

      //
    } catch (error: any) {
      dispatch(onSetLoadingProveedores(false));
      setLoadingCreate(false);
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Inactive user
  const startInactiveProveedor = async (Proveedor: any) => {
    dispatch(onSetLoadingProveedores(true));

    try {
      await projectApi.patch(`/api/provider/${Proveedor.provider_id}`, {
        ...Proveedor,
        is_active: !Proveedor.is_active,
      });

      await startLoadingProveedores();

      dispatch(onSetLoadingProveedores(false));

      if (!Proveedor.is_active) {
        toast.success('Proveedor activado con éxito');
        return;
      } else {
        toast.error('Proveedor desactivado con éxito');
        return;
      }
    } catch (error: any) {
      dispatch(onSetLoadingProveedores(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // User by id
  const startGetProveedorById = async (provider_id: string) => {
    dispatch(onSetLoadingProveedores(true));

    try {
      const { data } = await projectApi.get(`/api/provider/${provider_id}`);

      dispatch(onSetActiveProveedor(data.response));
      dispatch(onSetLoadingProveedores(false));
    } catch (error: any) {
      dispatch(onSetLoadingProveedores(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Delete Proveedor
  const startDeleteProveedor = async (provider_id: string) => {
    dispatch(onSetLoadingProveedores(true));

    try {
      await projectApi.delete(`/api/provider/remove/${provider_id}`);

      await startLoadingProveedores();
      dispatch(onSetLoadingProveedores(false));

      toast.success('Proveedor eliminado con éxito');
    } catch (error: any) {
      dispatch(onSetLoadingProveedores(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  return {
    // Properties
    proveedores,
    activeProveedor,
    loading,
    loadingCreate,
    error,

    // Methods
    setActiveProveedor,
    startInactiveProveedor,
    startLoadingProveedores,
    startSavingProveedor,
    startGetProveedorById,
    startDeleteProveedor,
  };
};
