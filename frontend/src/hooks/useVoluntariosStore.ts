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

  // Get Users
  const startLoadingVoluntarios = async () => {
    dispatch(onSetLoadingVoluntarios(true));

    try {
      const { data } = await projectApi.get('/api/direct-volunteer');

      dispatch(onLoadVoluntarios(data.response));
    } catch (error) {
      dispatch(onSetLoadingVoluntarios(false));
      console.log('Error cargando los Voluntarios');
      console.log(error);
    }
  };

  // Set active user
  const setActiveVoluntario = (user: TVoluntario | null) => {
    dispatch(onSetActiveVoluntario(user));
  };

  // Saving user
  const startSavingVoluntario = async (userForm: any) => {
    setLoadingCreate(true);

    try {
      if (userForm.direct_volunteer_id) {
        // Update user
        await projectApi.patch(
          `/api/direct-volunteer/${userForm.direct_volunteer_id}`,
          userForm
        );

        dispatch(onUpdateVoluntario(userForm));
        setLoadingCreate(false);

        // update user notification
        toast.success('Voluntario actualizado con éxito');
        return;
      }

      // Create activity
      const { data } = await projectApi.post(
        '/api/direct-volunteer/register',
        userForm
      );
      dispatch(
        onAddNewVoluntario({
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
      const errData = error.response.data;
      console.log(error);
      toast.error(errData.title);
    }
  };

  // User by id
  const startGetVoluntarioById = async (direct_volunteer_id: string) => {
    dispatch(onSetLoadingVoluntarios(true));

    try {
      const { data } = await projectApi.get(
        `/api/direct-volunteer/${direct_volunteer_id}`
      );

      dispatch(onSetActiveVoluntario(data.response));
      dispatch(onSetLoadingVoluntarios(false));
    } catch (error: any) {
      const errData = error.response.data;
      console.log(error);
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
      const errData = error.response.data;
      console.log(error);
      toast.error(errData.title);
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
