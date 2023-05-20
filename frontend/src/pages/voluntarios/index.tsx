// React
import { useEffect } from 'react';

// Next

// Hooks
import { useVoluntariosStore } from '@/hooks';

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout, Loader } from '@/components';
import VoluntariosDrawer from './components/VoluntariosDrawer';
import VoluntariosTable from './components/VoluntariosTable';

// Styles
import s from './styles/Voluntarios.module.scss';

function Voluntarios() {
  const { loading, startLoadingVoluntarios } = useVoluntariosStore();

  useEffect(() => {
    startLoadingVoluntarios();
  }, []);

  return (
    <Layout pageTitle="Voluntarios directos" roles={['1', '3', '6']}>
      <div className={s.voluntarios}>
        <div className={s.voluntarios__header}>
          <h1 className={s.voluntarios__title}>Voluntarios Directos</h1>
          <VoluntariosDrawer />
        </div>

        <div className={s.voluntarios__table}>
          {loading ? <Loader /> : <VoluntariosTable />}
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Voluntarios);
