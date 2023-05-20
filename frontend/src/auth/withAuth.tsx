// React
import { useEffect } from 'react';

//  HOC
import { NextComponentType } from 'next';

// Renew token if expired
import { useAuthStore } from '@/hooks';

export function withAuth(Component: NextComponentType) {
  const Auth = (props: JSX.IntrinsicAttributes) => {
    const { checkToken } = useAuthStore();

    useEffect(() => {
      checkToken();
    }, []);

    return <Component {...props} />;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
}
