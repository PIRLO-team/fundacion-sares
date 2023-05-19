// React
import { useState } from 'react';

// Next
// import { useRouter } from 'next/router';

// Redux hooks
import { useAppDispatch, useAppSelector } from '@/store/app/hooks';

// Store actions
import {
  onAddNewVoluntario,
  onLoadVoluntarios,
  onSetActiveVoluntario,
  onSetLoadingVoluntarios,
  onUpdateVoluntario,
} from '@/store';

// Notifications
import { toast } from 'sonner';

// Axios instance
import { projectApi } from '@/api';

// Types
import { TVoluntario } from '@/utils/types/';

export const useVoluntariosStore = () => {
  const { voluntarios, activeVoluntario, loading } = useAppSelector(
    (state) => state.voluntarios
  );

  // Dispatch
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>();
  const [loadingCreate, setLoadingCreate] = useState(false);

  // Get voluntarios
  const startLoadingVoluntarios = async () => {
    dispatch(onSetLoadingVoluntarios(true));

    try {
      const { data } = await projectApi.get('/api/direct-volunteer');

      dispatch(onLoadVoluntarios(data.response));
    } catch (error: any) {
      dispatch(onSetLoadingVoluntarios(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Set active voluntario
  const setActiveVoluntario = (voluntario: TVoluntario | null) => {
    dispatch(onSetActiveVoluntario(voluntario));
  };

  // Saving voluntario
  const startSavingVoluntario = async (voluntarioForm: any) => {
    setLoadingCreate(true);

    try {
      if (voluntarioForm.direct_volunteer_id) {
        // Update voluntario
        await projectApi.patch(
          `/api/direct-volunteer/${voluntarioForm.direct_volunteer_id}`,
          voluntarioForm
        );

        dispatch(onUpdateVoluntario(voluntarioForm));
        setLoadingCreate(false);

        // update voluntario notification
        toast.success('Voluntario actualizado con éxito');
        return;
      }

      // Create activity
      const { data } = await projectApi.post(
        '/api/direct-volunteer/register',
        voluntarioForm
      );
      dispatch(
        onAddNewVoluntario({
          ...voluntarioForm,
        })
      );
      setLoadingCreate(false);

      toast.message(data.title, {
        description: data.message,
      });

      //
    } catch (error: any) {
      dispatch(onSetLoadingVoluntarios(false));
      setLoadingCreate(false);
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Inactive voluntario
  const startInactiveVoluntario = async (voluntario: any) => {
    dispatch(onSetLoadingVoluntarios(true));

    try {
      await projectApi.patch(
        `/api/direct-volunteer/${voluntario.direct_volunteer_id}`,
        {
          ...voluntario,
          is_active: !voluntario.is_active,
        }
      );

      await startLoadingVoluntarios();

      dispatch(onSetLoadingVoluntarios(false));

      if (!voluntario.is_active) {
        toast.success('Voluntario activado con éxito');
        return;
      } else {
        toast.error('Voluntario desactivado con éxito');
        return;
      }
    } catch (error: any) {
      dispatch(onSetLoadingVoluntarios(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // voluntario by id
  const startGetVoluntarioById = async (direct_volunteer_id: string) => {
    dispatch(onSetLoadingVoluntarios(true));

    try {
      const { data } = await projectApi.get(
        `/api/direct-volunteer/${direct_volunteer_id}`
      );

      dispatch(onSetActiveVoluntario(data.response));
      dispatch(onSetLoadingVoluntarios(false));
    } catch (error: any) {
      dispatch(onSetLoadingVoluntarios(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Delete voluntario
  const startDeleteVoluntario = async (direct_volunteer_id: string) => {
    dispatch(onSetLoadingVoluntarios(true));

    try {
      await projectApi.delete(
        `/api/direct-volunteer/remove/${direct_volunteer_id}`
      );

      await startLoadingVoluntarios();
      dispatch(onSetLoadingVoluntarios(false));

      toast.success('Voluntario eliminado con éxito');
    } catch (error: any) {
      dispatch(onSetLoadingVoluntarios(false));
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  return {
    // Properties
    voluntarios,
    activeVoluntario,
    loading,
    loadingCreate,
    error,

    // Methods
    setActiveVoluntario,
    startInactiveVoluntario,
    startLoadingVoluntarios,
    startSavingVoluntario,
    startGetVoluntarioById,
    startDeleteVoluntario,
  };
};
