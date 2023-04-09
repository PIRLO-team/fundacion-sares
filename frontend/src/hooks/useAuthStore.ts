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
  const dispatch = useAppDispatch();

  const { status, currentUser, errorMessage } = useAppSelector(
    (state) => state.auth
  );

  const router = useRouter();

  const startLogout = async () => {
    localStorage.clear();
    dispatch(onLogout());

    if (router.pathname !== '/login') {
      router.replace('/login');
    }
  };

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

  return {
    // Properties
    status,
    currentUser,
    errorMessage,

    // Methods
    startLogin,
    startLogout,
    startResetPassword,
  };
};
