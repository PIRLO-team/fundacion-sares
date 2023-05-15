// React
import { useEffect } from 'react';

// Next
import { useRouter } from 'next/router';

// Hooks
import { useAuthStore } from '@/hooks';

// Local Components
import { Sidebar, SEO, Nav } from '../';

// Styles
import s from './Layout.module.scss';

type TLayout = {
  children: React.ReactNode;
  pageTitle: string;
  roles: string[];
};

export function Layout({ children, pageTitle, roles }: TLayout) {
  const { currentUser } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    if (!roles.includes(currentUser?.role?.role_id as string)) {
      router.replace('/');
    }
  }, []);

  return (
    <div>
      <SEO pageTitle={pageTitle} />
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>
          <Nav />

          {children}
        </div>
      </div>
    </div>
  );
}
