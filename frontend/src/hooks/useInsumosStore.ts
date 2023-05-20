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

  // Get insumos
  const startLoadingInsumos = async () => {
    dispatch(onSetLoadingInsumos(true));

    try {
      const { data } = await projectApi.get('/api/supply/all');

      dispatch(onLoadInsumos(data.response));
    } catch (error: any) {
      dispatch(onSetLoadingInsumos(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Set active insumo
  const setActiveInsumo = (insumo: TInsumo | null) => {
    dispatch(onSetActiveInsumo(insumo));
  };

  // Saving insumo
  const startSavingInsumo = async (insumoForm: any) => {
    setLoadingCreate(true);

    try {
      if (insumoForm.supply_id) {
        // Update insumo
        await projectApi.patch(
          `/api/supply/update-supply/${insumoForm.supply_id}`,
          insumoForm
        );

        dispatch(onUpdateInsumo(insumoForm));
        setLoadingCreate(false);

        // update insumo notification
        toast.success('Insumo actualizado con éxito');
        return;
      }

      // Create activity
      const { data } = await projectApi.post(
        '/api/supply/create-supply',
        insumoForm
      );
      dispatch(
        onAddNewInsumo({
          ...insumoForm,
        })
      );
      setLoadingCreate(false);

      toast.message(data.title, {
        description: data.message,
      });

      //
    } catch (error: any) {
      dispatch(onSetLoadingInsumos(false));
      setLoadingCreate(false);
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Inactive insumo
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
      dispatch(onSetLoadingInsumos(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // insumo by id
  const startGetInsumoById = async (supply_id: string) => {
    dispatch(onSetLoadingInsumos(true));

    try {
      const { data } = await projectApi.get(`/api/supply/${supply_id}`);

      dispatch(onSetActiveInsumo(data.response));
      dispatch(onSetLoadingInsumos(false));
    } catch (error: any) {
      dispatch(onSetLoadingInsumos(false));
      const errData = error.response.data;
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
      dispatch(onSetLoadingInsumos(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Discount amount insumo
  const startDiscountInsumo = async (
    supply_id: string,
    quantity: string,
    discount_type_id: string
  ) => {
    dispatch(onSetLoadingInsumos(true));

    try {
      await projectApi.patch(
        `/api/supply/update-quantity-supply/${supply_id}`,
        {
          quantity,
          discount_type_id,
        }
      );

      await startLoadingInsumos();
      dispatch(onSetLoadingInsumos(false));

      toast.success('Insumo descontado con éxito');
    } catch (error: any) {
      dispatch(onSetLoadingInsumos(false));
      const errData = error.response.data;
      toast.error(errData.message);
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
    startDiscountInsumo,
  };
};
