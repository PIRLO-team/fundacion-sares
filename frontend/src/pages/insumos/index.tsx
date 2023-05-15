// React
import { useEffect } from 'react';

// Next
import Link from 'next/link';

// Hooks
import { useInsumosStore, useProductosStore } from '@/hooks';

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout, Loader } from '@/components';
import InsumosDrawer from './components/InsumosDrawer';
import InsumosTable from './components/InsumosTable';

// Styles
import s from './styles/Insumos.module.scss';

function Insumos() {
  const { loading, startLoadingInsumos } = useInsumosStore();
  const { startLoadingProductos } = useProductosStore();

  useEffect(() => {
    startLoadingInsumos();
    startLoadingProductos();
  }, []);

  return (
    <Layout pageTitle="Insumos" roles={['1', '2', '4', '5']}>
      <div className={s.insumos}>
        <div className={s.insumos__header}>
          <h1 className={s.insumos__title}>Insumos</h1>
          <Link href="/insumos/productos">Productos</Link>
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
