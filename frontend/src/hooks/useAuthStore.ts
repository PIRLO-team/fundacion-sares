// React
import { useState } from 'react';

// Redux hooks
import { useAppDispatch, useAppSelector } from '@/store/app/hooks';

// Next
import { useRouter } from 'next/router';

// API Axios Call
import { projectApi } from '@/api';

// Redux Actions
import { checkingCredentials, onLogin, onLogout } from '@/store';

// Soonner Notifications
import { toast } from 'sonner';

export const useAuthStore = () => {
  // Redux Hooks
  const dispatch = useAppDispatch();
  const { status, currentUser, errorMessage } = useAppSelector(
    (state) => state.auth
  );

  // Router
  const router = useRouter();

  // Loading
  const [loading, setLoading] = useState(false);

  // Logout
  const startLogout = async () => {
    localStorage.clear();
    dispatch(onLogout());

    if (router.pathname !== '/login') {
      router.replace('/login');
    }
  };

  // Login
  const startLogin = async ({
    user,
    password,
  }: {
    user: string;
    password: string;
  }) => {
    dispatch(checkingCredentials());

    try {
      const { data } = await projectApi.post('/auth/login', {
        user,
        password,
      });

      console.log(data);

      const userData = data.response.userData;
      const roleData = data.response.userRole;

      localStorage.setItem('Authorization', data.response.token);
      localStorage.setItem(
        'Authorization-init-date',
        new Date().getTime().toString()
      );

      dispatch(
        onLogin({
          uid: userData.user_id,
          name: userData.first_name + ' ' + userData.last_name,
          email: userData.email,
          username: userData.username,
          role: roleData.role_id,
          photoURL: userData.photoURL,
          coverPhotoURL: userData.coverPhotoURL,
        })
      );
    } catch (error: any) {
      const errData = error.response.data;

      if (errData.response.new_user) {
        router.replace(
          `/login/reset?user=${errData.response.user_id}&code=${errData.response.code}`,
          '/login/reset'
        );
        toast.message(errData.title, {
          description: 'Por favor, cambie su contraseña',
        });
        startLogout();
        return;
      }

      toast.error(errData.title);
      startLogout();
    }
  };

  // Reset Password
  const startResetPassword = async ({
    user,
    code,
    password,
    confirmPassword,
  }: {
    user: string;
    code: string;
    password: string;
    confirmPassword: string;
  }) => {
    dispatch(checkingCredentials());

    try {
      const { data } = await projectApi.patch(
        `/auth/reset?user=${user}&code=${code}`,
        {
          password,
          confirmPassword,
        }
      );

      toast.message(data.title, {
        description: data.message,
      });

      router.replace('/login');
      startLogout();
    } catch (error: any) {
      const errData = error.response.data;

      console.log(error);

      toast.error(errData.title);
      startLogout();
    }
  };

  // Create User
  const startCreateUser = async ({
    first_name,
    last_name,
    email,
    profession,
    user_role,
  }: {
    first_name: string;
    last_name: string;
    email: string;
    profession: string;
    user_role: string;
  }) => {
    setLoading(true);

    try {
      const { data } = await projectApi.post('/auth/register', {
        first_name,
        last_name,
        email,
        profession,
        user_role,
      });

      console.log(data);

      toast.message(data.title, {
        description: data.message,
      });

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errData = error.response.data;

      console.log(error);

      toast.error(errData.title);
    }
  };

  return {
    // Properties
    status,
    currentUser,
    errorMessage,
    loading,

    // Methods
    startLogin,
    startLogout,
    startResetPassword,
    startCreateUser,
  };
};
