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
  const { users, activeUser, loading } = useAppSelector((state) => state.users);

  // Dispatch
  const dispatch = useAppDispatch();

  const [error, setError] = useState<string | null>();
  const [loadingCreate, setLoadingCreate] = useState(false);

  // Get Users
  const startLoadingUsers = async () => {
    dispatch(onSetLoadingUsers(true));

    try {
      const { data } = await projectApi.get('/api/user/all');

      dispatch(onLoadUsers(data.response));
    } catch (error) {
      dispatch(onSetLoadingUsers(false));
      console.log('Error cargando los usuarios');
      console.log(error);
    }
  };

  // Set active user
  const setActiveUser = (user: TUser | null) => {
    dispatch(onSetActiveUser(user));
  };

  // Saving user
  const startSavingUser = async (userForm: any) => {
    setLoadingCreate(true);

    try {
      if (userForm.user_id) {
        // Update user
        await projectApi.patch(
          `/api/user/update/${userForm.user_id}`,
          userForm
        );

        dispatch(onUpdateUser(userForm));
        setLoadingCreate(false);

        // update user notification
        toast.success('Usuario actualizado con éxito');
        return;
      }

      // Create activity
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
      setLoadingCreate(false);
      const errData = error.response.data;
      console.log(error);
      toast.error(errData.message);
    }
  };

  // Inactive user
  const startInactiveUser = async ({
    user_id,
    is_active,
  }: {
    user_id: string;
    is_active: boolean;
  }) => {
    dispatch(onSetLoadingUsers(true));

    try {
      await projectApi.delete(`/api/user/inactive/${user_id}`, {
        data: { is_active: !is_active },
      });

      startLoadingUsers();
      dispatch(onSetLoadingUsers(false));

      if (!is_active) {
        toast.success('Usuario activado con éxito');
        return;
      } else {
        toast.error('Usuario desactivado con éxito');
        return;
      }
    } catch (error: any) {
      const errData = error.response.data;
      console.log(error);
      toast.error(errData.title);
    }
  };

  // User by id
  const startGetUserById = async (user_id: string) => {
    dispatch(onSetLoadingUsers(true));

    try {
      const { data } = await projectApi.get(`/api/user/${user_id}`);

      console.log(data);
      dispatch(onSetActiveUser(data.response));
      dispatch(onSetLoadingUsers(false));
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
    startGetUserById,
  };
};
