// React
import { useState } from 'react';

// Redux hooks
import { useAppDispatch, useAppSelector } from '@/store/app/hooks';

// Next
import { useRouter } from 'next/router';

// API Axios Call
import { projectApi } from '@/api';

// Redux Actions
import {
  checkingCredentials,
  onLogin,
  onLogout,
  onLogoutUsers,
  onLogoutVoluntarios,
  onLogoutProveedores,
  onLogoutInsumos,
  onLogoutNoConsumible,
} from '@/store';

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
    dispatch(onLogoutUsers());
    dispatch(onLogoutVoluntarios());
    dispatch(onLogoutProveedores());
    dispatch(onLogoutInsumos());
    dispatch(onLogoutNoConsumible());

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

      const userData = data.response.userData;
      const roleData = data.response.userRole;

      localStorage.setItem('Authorization', data.response.token);

      dispatch(
        onLogin({
          uid: userData.user_id,
          name: userData.first_name + ' ' + userData.last_name,
          email: userData.email,
          username: userData.username,
          role: roleData,
          profession: userData.profession,
          phone: userData.phone,
          other_contact: userData.other_contact,
          img_profile: userData.img_profile,
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

      toast.error(errData.message);
      startLogout();
    }
  };

  // Check if token is valid
  const checkToken = async () => {
    const token = localStorage.getItem('Authorization');

    if (!token) {
      startLogout();
      return;
    }

    dispatch(checkingCredentials());

    try {
      const { data } = await projectApi.get('/auth/check');

      const userData = data.response;
      const roleData = data.response.userRole;

      dispatch(
        onLogin({
          uid: userData.user_id,
          name: userData.first_name + ' ' + userData.last_name,
          email: userData.email,
          username: userData.username,
          role: roleData,
          profession: userData.profession,
          phone: userData.phone,
          other_contact: userData.other_contact,
          img_profile: userData.img_profile,
          coverPhotoURL: userData.coverPhotoURL,
        })
      );
    } catch (error: any) {
      startLogout();
    }
  };

  const startResetPasswordStep1 = async (email: string) => {
    setLoading(true);
    try {
      const { data } = await projectApi.post('/auth/password-reset-step-one', {
        email,
      });

      toast.message(data.title, {
        description: data.message,
      });

      router.push(
        `/login/steps/step2?user=${data.response.user_id}`,
        '/login/steps/step2'
      );

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errData = error.response.data;
      setLoading(false);
      toast.error(errData.message);
    }
  };

  const startResetPasswordStep2 = async ({
    user,
    code,
  }: {
    user: string;
    code: number;
  }) => {
    setLoading(true);

    try {
      const { data } = await projectApi.post('/auth/password-reset-step-two', {
        code,
      });

      toast.message(data.title, {
        description: data.message,
      });

      router.push(`/login/reset?user=${user}&code=${code}`, '/login/reset');
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Resend code
  const resendCode = async (user: string) => {
    setLoading(true);

    try {
      const { data } = await projectApi.post(
        `/auth/regenerate-code?user=${user}`
      );

      toast.message(data.title, {
        description: data.message,
      });

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const errData = error.response.data;
      toast.error(errData.message);
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
    } catch (error: any) {
      setLoading(false);
      const errData = error.response.data;
      toast.error(errData.message);
    }
  };

  // Update password
  const startUpdatePassword = async ({
    user_id,
    password,
    new_password,
    comfirm_password,
  }: {
    user_id: string;
    password: string;
    new_password: string;
    comfirm_password: string;
  }) => {
    try {
      const { data } = await projectApi.patch(
        `/api/user/update-password/${user_id}`,
        {
          password,
          new_password,
          comfirm_password,
        }
      );

      toast.message(data.title, {
        description: data.message,
      });
    } catch (error: any) {
      setLoading(false);
      const errData = error.response.data;
      toast.error(errData.message);
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
    checkToken,
    startLogout,
    resendCode,
    startResetPassword,
    startResetPasswordStep1,
    startResetPasswordStep2,
    startUpdatePassword,
  };
};
