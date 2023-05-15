// Local Components
import { useEffect } from 'react';
import { Sidebar, SEO, Nav } from '../';

// Styles
import s from './Layout.module.scss';
import { useAuthStore } from '@/hooks';
import { useRouter } from 'next/router';

type TLayout = {
  children: React.ReactNode;
  pageTitle: string;
  roles: string[];
};

export function Layout({ children, pageTitle, roles }: TLayout) {
  const { currentUser } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    if (!roles.includes(currentUser.role.role_id as string)) {
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
