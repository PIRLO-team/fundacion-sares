// React
import { useState } from 'react';

// Next
// import { useRouter } from 'next/router';

// Redux hooks
import { useAppDispatch, useAppSelector } from '@/store/app/hooks';

// Store actions
import {
  onAddNewUser,
  onLoadUsers,
  onSetActiveUser,
  onSetLoadingUsers,
  onUpdateUser,
} from '@/store';

// Notifications
import { toast } from 'sonner';

// Axios instance
import { projectApi } from '@/api';

// Types
import { TUser } from '@/utils/types/';

export const useUsersStore = () => {
  //Get all activities by username
  const { users, activeUser, loading } = useAppSelector((state) => state.users);

  // Dispatch
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>();
  const [loadingCreate, setLoadingCreate] = useState(false);

  // Get Activities
  const startLoadingUsers = async () => {
    dispatch(onSetLoadingUsers(true));

    try {
      const { data } = await projectApi.get('/api/user/all');

      dispatch(onLoadUsers(data.response));
      // console.log(data.response);
    } catch (error) {
      console.log('Error cargando actividades');
      console.log(error);
    }
  };

  // Set active activity
  const setActiveUser = (user: TUser | null) => {
    dispatch(onSetActiveUser(user));
  };

  // VER ESTAS DOS FUNCIONES

  // Saving user
  const startSavingUser = async (userForm: any) => {
    setLoadingCreate(true);

    try {
      if (userForm.user_id) {
        // Update activity
        await projectApi.patch(
          `/api/user/update/${userForm.user_id}`,
          userForm
        );

        dispatch(onUpdateUser(userForm));
        setLoadingCreate(false);

        // Update activity notification
        toast.success('Usuario actualizado con éxito');
        return;
      }

      // Add new activity
      const { data } = await projectApi.post('/auth/register', userForm);
      dispatch(
        onAddNewUser({
          ...userForm,
        })
      );
      setLoadingCreate(false);

      toast.message(data.title, {
        description: data.message,
      });

      //
    } catch (error: any) {
      const errData = error.response.data;
      console.log(error);
      toast.error(errData.title);
    }
  };

  // Delete activity
  const startInactiveUser = async ({
    user_id,
    is_active,
  }: {
    user_id: string;
    is_active: boolean;
  }) => {
    dispatch(onSetLoadingUsers(false));

    try {
      await projectApi.delete(`/api/user/inactive/${user_id}`, {
        data: { is_active: !is_active },
      });

      startLoadingUsers();

      toast.success('Usuario actualizado con éxito');
    } catch (error: any) {
      const errData = error.response.data;
      console.log(error);
      toast.error(errData.title);
    }
  };

  return {
    // Properties
    users,
    activeUser,
    loading,
    loadingCreate,
    error,

    // Methods
    setActiveUser,
    startInactiveUser,
    startLoadingUsers,
    startSavingUser,
  };
};
