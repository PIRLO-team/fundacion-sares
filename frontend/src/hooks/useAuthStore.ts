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

  const { status, user, errorMessage } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const startLogout = async () => {
    localStorage.clear();
    dispatch(onLogout());

    if (router.pathname !== '/auth/login') {
      router.push('/auth/login');
    }
  };

  const startLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    dispatch(checkingCredentials());

    try {
      const { data } = await projectApi.post('/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(
        onLogin({
          uid: data.uid,
          name: data.user.name,
          email: data.user.email,
          username: data.user.username,
          role: data.user.role,
          photoURL: data.user.photoURL,
          coverPhotoURL: data.user.coverPhotoURL,
        })
      );
    } catch (error: any) {
      startLogout();
      toast.error('Credenciales incorrectas');
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      startLogout();
      return;
    }

    try {
      const { data } = await projectApi.get('/auth/renew');

      localStorage.setItem('token', data.token);
      localStorage.setItem('token-init-date', new Date().getTime().toString());

      dispatch(
        onLogin({
          uid: data.uid,
          name: data.user.name,
          email: data.user.email,
          username: data.user.username,
          role: data.user.role,
          photoURL: data.user.photoURL,
          coverPhotoURL: data.user.coverPhotoURL,
        })
      );
    } catch (error: any) {
      console.log(error);
      localStorage.clear();

      startLogout();
    }
  };

  return {
    // Properties
    status,
    user,
    errorMessage,

    // Methods
    startLogin,
    startLogout,
    checkAuthToken,
  };
};
