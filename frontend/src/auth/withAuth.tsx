// React
import { useEffect } from 'react';

//  HOC
import { NextComponentType } from 'next';

// Local component
import Login from '../pages/login';
import { Loader } from '@/components';

// Renew token if expired
import { useAuthStore } from '@/hooks';
import { useRouter } from 'next/router';

export function withAuth(
  Component: NextComponentType
  // config?: { isAuthPage: boolean }
) {
  const Auth = (props: JSX.IntrinsicAttributes) => {
    const { status, currentUser, checkToken } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
      checkToken();
    }, []);

    useEffect(() => {
      if (status === 'not-authenticated') {
        router.replace('/login');
      }
    }, [status]);

    // if (status === 'checking') {
    //   return <Loader />;
    // }

    // If currentUser is logged in, return original component

    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}
