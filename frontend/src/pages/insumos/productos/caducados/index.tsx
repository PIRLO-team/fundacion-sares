// React
import { useEffect } from 'react';

// Next

// Hooks
import { useProductosStore } from '@/hooks';

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout, Loader } from '@/components';
import CaducadosTable from './components/CaducadosTable';
import InsumosHeader from '../../components/InsumosHeader/InsumosHeader';

// Styles
import s from './Caducados.module.scss';

function Caducados() {
  const { loading, startLoadingExpiredProductos } = useProductosStore();

  useEffect(() => {
    startLoadingExpiredProductos();
  }, []);

  return (
    <Layout pageTitle="Productos caducados" roles={['1', '2', '4', '5']}>
      <div className={s.caducados}>
        <div className={s.caducados__header}>
          <h1 className={s.caducados__title}>Productos caducados</h1>
          <InsumosHeader />
        </div>

        <div className={s.caducados__table}>
          {loading ? <Loader /> : <CaducadosTable />}
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Caducados);
