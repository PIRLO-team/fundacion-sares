// React
import { useEffect } from 'react';

// Next

// Hooks
import { useProveedoresStore } from '@/hooks';

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout, Loader } from '@/components';
import ProveedoresDrawer from './components/ProveedoresDrawer';
import ProveedoresTable from './components/ProveedoresTable';

// Styles
import s from './styles/Proveedores.module.scss';

function Proveedores() {
  const { loading, startLoadingProveedores } = useProveedoresStore();

  useEffect(() => {
    startLoadingProveedores();
  }, []);
  return (
    <Layout pageTitle="Manejo de usuarios">
      <div className={s.proveedores}>
        <div className={s.proveedores__header}>
          <h1 className={s.proveedores__title}>Proveedores</h1>
          <ProveedoresDrawer />
        </div>

        <div className={s.proveedores__table}>
          {loading ? <Loader /> : <ProveedoresTable />}
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Proveedores);
