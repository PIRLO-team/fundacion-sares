// React
import { useEffect } from 'react';

// Next

// Hooks
import {
  useInsumosStore,
  useProductosStore,
  useProveedoresStore,
} from '@/hooks';

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout, Loader } from '@/components';
import InsumosDrawer from './components/InsumosDrawer';
import InsumosTable from './components/InsumosTable';
import InsumosHeader from './components/InsumosHeader/InsumosHeader';

// Styles
import s from './styles/Insumos.module.scss';

function Insumos() {
  const { loading, startLoadingInsumos } = useInsumosStore();
  const { startLoadingProveedores } = useProveedoresStore();
  const { startLoadingProductos } = useProductosStore();

  useEffect(() => {
    startLoadingInsumos();
    startLoadingProveedores();
    startLoadingProductos();
  }, []);

  return (
    <Layout pageTitle="Insumos" roles={['1', '2', '4', '5']}>
      <div className={s.insumos}>
        <h1 className={s.insumos__title}>Insumos consumibles</h1>

        <div className={s.insumos__header}>
          <InsumosHeader />
          <InsumosDrawer />
        </div>

        <div className={s.insumos__table}>
          {loading ? <Loader /> : <InsumosTable />}
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Insumos);
