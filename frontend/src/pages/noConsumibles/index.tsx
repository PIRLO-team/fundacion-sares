// React
import { useEffect } from 'react';

// Next

// Hooks
import { useNoConsumiblesStore, useProveedoresStore } from '@/hooks';

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout, Loader } from '@/components';
import NoConsumiblesDrawer from './components/NoConsumiblesDrawer';
import NoConsumiblesTable from './components/NoConsumiblesTable';

// Styles
import s from './styles/NoConsumibles.module.scss';
import NoConsumibleCategoryModal from './components/NoConsumibleCategoryModal';

function NoConsumibles() {
  const { loading, startLoadingNoConsumible, startLoadingCategories } =
    useNoConsumiblesStore();

  const { startLoadingProveedores } = useProveedoresStore();

  useEffect(() => {
    startLoadingNoConsumible();
    startLoadingCategories();
    startLoadingProveedores();
  }, []);

  return (
    <Layout pageTitle="No consumibles" roles={['1', '2', '4', '5']}>
      <div className={s.noConsumibles}>
        <div className={s.noConsumibles__header}>
          <h1 className={s.noConsumibles__title}>No consumibles</h1>
          <div className={s.noConsumibles__header__buttons}>
            <NoConsumibleCategoryModal />
            <NoConsumiblesDrawer />
          </div>
        </div>

        <div className={s.noConsumibles__table}>
          {loading ? <Loader /> : <NoConsumiblesTable />}
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(NoConsumibles);
