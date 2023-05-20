// React
import { useState } from 'react';

// Next
// import { useRouter } from 'next/router';

// Redux hooks
import { useAppDispatch, useAppSelector } from '@/store/app/hooks';

// Store actions
import {
  onAddNewNoConsumible,
  onLoadCategories,
  onLoadNoConsumibles,
  onSetActiveNoConsumible,
  onSetLoadingNoConsumibles,
  onUpdateNoConsumible,
} from '@/store';

// Notifications
import { toast } from 'sonner';

// Axios instance
import { projectApi } from '@/api';

// Types
import { TNoConsumible } from '@/utils/types/';

export const useNoConsumiblesStore = () => {
  const { noConsumibles, categories, activeNoConsumible, loading } =
    useAppSelector((state) => state.noConsumibles);

  // Dispatch
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>();

  const [loadingCreate, setLoadingCreate] = useState(false);

  // get categories
  const startLoadingCategories = async () => {
    try {
      const { data } = await projectApi.get(
        '/api/supply/non-consumable/categories'
      );

      dispatch(onLoadCategories(data.response));
    } catch (error: any) {
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Get no consumibles
  const startLoadingNoConsumible = async () => {
    dispatch(onSetLoadingNoConsumibles(true));

    try {
      const { data } = await projectApi.get('/api/supply/non-consumable/all');

      dispatch(onLoadNoConsumibles(data.response));
    } catch (error: any) {
      dispatch(onSetLoadingNoConsumibles(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Create category
  const startCreatingCategory = async (category: any) => {
    try {
      const { data } = await projectApi.post(
        '/api/supply/create-non-consumable-supply-category',
        category
      );

      toast.message(data.title, {
        description: data.message,
      });

      await startLoadingCategories();
    } catch (error: any) {
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Set active no consumible
  const setActiveNoConsumible = (noConsumible: TNoConsumible | null) => {
    dispatch(onSetActiveNoConsumible(noConsumible));
  };

  // Saving no consumible
  const startSavingNoConsumible = async (noConsumibleForm: any) => {
    setLoadingCreate(true);

    try {
      if (noConsumibleForm.non_consumable_id) {
        // Update no consumible
        await projectApi.patch(
          `/api/supply/update-non-consumable-supply/${noConsumibleForm.non_consumable_id}`,
          noConsumibleForm
        );

        dispatch(onUpdateNoConsumible(noConsumibleForm));
        setLoadingCreate(false);

        // update no consumible notification
        toast.success('Insumo actualizado con éxito');
        return;
      }

      // Create activity
      const { data } = await projectApi.post(
        '/api/supply/create-non-consumable-supply',
        noConsumibleForm
      );
      dispatch(
        onAddNewNoConsumible({
          ...noConsumibleForm,
        })
      );
      setLoadingCreate(false);

      toast.message(data.title, {
        description: data.message,
      });

      //
    } catch (error: any) {
      dispatch(onSetLoadingNoConsumibles(false));
      setLoadingCreate(false);
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // no consumible by id
  const startGetNoConsumibleById = async (supply_id: string) => {
    dispatch(onSetLoadingNoConsumibles(true));

    try {
      const { data } = await projectApi.get(
        `/api/supply/non-consumable/${supply_id}`
      );

      dispatch(onSetActiveNoConsumible(data.response));
      dispatch(onSetLoadingNoConsumibles(false));
    } catch (error: any) {
      dispatch(onSetLoadingNoConsumibles(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Delete Insumo
  const startDeleteNoConsumible = async (supply_id: string) => {
    dispatch(onSetLoadingNoConsumibles(true));

    try {
      await projectApi.delete(
        `/api/supply/delete-non-consumable-supply/${supply_id}`
      );

      await startLoadingNoConsumible();
      dispatch(onSetLoadingNoConsumibles(false));

      toast.success('Insumo eliminado con éxito');
    } catch (error: any) {
      dispatch(onSetLoadingNoConsumibles(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Discount amount insumo
  const startDiscountNoConsumible = async (
    non_consumable_id: string,
    discount_type_id: number
  ) => {
    dispatch(onSetLoadingNoConsumibles(true));

    try {
      await projectApi.patch(
        `/api/supply/discount-non-consumable-supply/${non_consumable_id}`,
        {
          discount_type_id: discount_type_id,
        }
      );

      await startLoadingNoConsumible();
      dispatch(onSetLoadingNoConsumibles(false));

      toast.success('Insumo descontado con éxito');
    } catch (error: any) {
      dispatch(onSetLoadingNoConsumibles(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  return {
    // Properties
    noConsumibles,
    categories,
    activeNoConsumible,
    loading,
    loadingCreate,
    error,

    // Methods
    setActiveNoConsumible,
    startLoadingNoConsumible,
    startSavingNoConsumible,
    startGetNoConsumibleById,
    startDeleteNoConsumible,
    startDiscountNoConsumible,
    startLoadingCategories,
    startCreatingCategory,
  };
};
