// React
import { useEffect } from 'react';

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout, Loader } from '@/components';
import UserTable from './components/UserTable';
import UserDrawer from './components/UserDrawer';

// Hooks
import { useUsersStore } from '@/hooks';

// Styles
import s from './styles/manejoUsuarios.module.scss';

function ManejoUsuarios() {
  // UseUsersStore
  const { loading, startLoadingUsers } = useUsersStore();

  useEffect(() => {
    startLoadingUsers();
  }, []);

  return (
    <Layout pageTitle="Manejo de usuarios" roles={['1']}>
      <div className={s.manejoUsuarios}>
        <div className={s.manejoUsuarios__header}>
          <h1 className={s.manejoUsuarios__title}>Usuarios</h1>
          <UserDrawer />
        </div>
        <div className={s.manejoUsuarios__table}>
          {loading ? <Loader /> : <UserTable />}
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(ManejoUsuarios);
