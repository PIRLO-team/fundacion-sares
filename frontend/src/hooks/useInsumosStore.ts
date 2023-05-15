// React
import { useState } from 'react';

// Next
// import { useRouter } from 'next/router';

// Redux hooks
import { useAppDispatch, useAppSelector } from '@/store/app/hooks';

// Store actions
import {
  onAddNewInsumo,
  onLoadInsumos,
  onSetActiveInsumo,
  onSetLoadingInsumos,
  onUpdateInsumo,
} from '@/store';

// Notifications
import { toast } from 'sonner';

// Axios instance
import { projectApi } from '@/api';

// Types
import { TInsumo } from '@/utils/types/';

export const useInsumosStore = () => {
  const { insumos, activeInsumo, loading } = useAppSelector(
    (state) => state.insumos
  );

  // Dispatch
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>();
  const [loadingCreate, setLoadingCreate] = useState(false);

  // Get Users
  const startLoadingInsumos = async () => {
    dispatch(onSetLoadingInsumos(true));

    try {
      const { data } = await projectApi.get('/api/supply/all');

      dispatch(onLoadInsumos(data.response));
    } catch (error) {
      dispatch(onSetLoadingInsumos(false));
      console.log('Error cargando los insumos');
      console.log(error);
    }
  };

  // Set active user
  const setActiveInsumo = (user: TInsumo | null) => {
    dispatch(onSetActiveInsumo(user));
  };

  // Saving user
  const startSavingInsumo = async (userForm: any) => {
    setLoadingCreate(true);

    try {
      if (userForm.supply_id) {
        // Update user
        await projectApi.patch(
          `/api/supply/update-supply/${userForm.supply_id}`,
          userForm
        );

        dispatch(onUpdateInsumo(userForm));
        setLoadingCreate(false);

        // update user notification
        toast.success('Insumo actualizado con éxito');
        return;
      }

      // Create activity
      const { data } = await projectApi.post(
        '/api/supply/create-supply',
        userForm
      );
      dispatch(
        onAddNewInsumo({
          ...userForm,
        })
      );
      setLoadingCreate(false);

      toast.message(data.title, {
        description: data.message,
      });

      //
    } catch (error: any) {
      setLoadingCreate(false);
      const errData = error.response.data;
      console.log(error);
      toast.error(errData.message);
    }
  };

  // Inactive user
  const startInactiveInsumo = async (insumo: any) => {
    dispatch(onSetLoadingInsumos(true));

    try {
      await projectApi.patch(`/api/supply/update-supply/${insumo.supply_id}`, {
        ...insumo,
        is_active: !insumo.is_active,
      });

      await startLoadingInsumos();

      dispatch(onSetLoadingInsumos(false));

      if (!insumo.is_active) {
        toast.success('Insumo activado con éxito');
        return;
      } else {
        toast.error('Insumo desactivado con éxito');
        return;
      }
    } catch (error: any) {
      const errData = error.response.data;
      console.log(error);
      toast.error(errData.title);
    }
  };

  // User by id
  const startGetInsumoById = async (supply_id: string) => {
    dispatch(onSetLoadingInsumos(true));

    try {
      const { data } = await projectApi.get(`/api/supply/${supply_id}`);

      dispatch(onSetActiveInsumo(data.response));
      dispatch(onSetLoadingInsumos(false));
    } catch (error: any) {
      const errData = error.response.data;
      console.log(error);
      toast.error(errData.message);
    }
  };

  // Delete Insumo
  const startDeleteInsumo = async (supply_id: string) => {
    dispatch(onSetLoadingInsumos(true));

    try {
      await projectApi.delete(`/api/supply/delete/supply/${supply_id}`);

      await startLoadingInsumos();
      dispatch(onSetLoadingInsumos(false));

      toast.success('Insumo eliminado con éxito');
    } catch (error: any) {
      const errData = error.response.data;
      console.log(error);
      toast.error(errData.title);
    }
  };

  return {
    // Properties
    insumos,
    activeInsumo,
    loading,
    loadingCreate,
    error,

    // Methods
    setActiveInsumo,
    startInactiveInsumo,
    startLoadingInsumos,
    startSavingInsumo,
    startGetInsumoById,
    startDeleteInsumo,
  };
};
