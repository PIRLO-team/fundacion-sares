// React
import { useEffect } from 'react';

// Next

// Hooks
import { useProductosStore } from '@/hooks';

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout, Loader } from '@/components';
import ProductosDrawer from './components/ProductosDrawer';
import ProductosTable from './components/ProductosTable';
import InsumosHeader from '../components/InsumosHeader/InsumosHeader';

// Styles
import s from './Productos.module.scss';

function Productos() {
  const { loading, startLoadingProductos } = useProductosStore();

  useEffect(() => {
    startLoadingProductos();
  }, []);

  return (
    <Layout pageTitle="Productos" roles={['1', '2', '4', '5']}>
      <div className={s.productos}>
        <h1 className={s.productos__title}>Productos</h1>

        <div className={s.productos__header}>
          <InsumosHeader />
          <ProductosDrawer />
        </div>

        <div className={s.productos__table}>
          {loading ? <Loader /> : <ProductosTable />}
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Productos);
