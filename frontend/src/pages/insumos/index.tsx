// React

// Next

// Hooks

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout } from '@/components';

// Styles
import s from './styles/Insumos.module.scss';

function Insumos() {
  return (
    <Layout pageTitle="Insumos" roles={['1', '2', '4', '5']}>
      <h1>Insumos</h1>
    </Layout>
  );
}

export default withAuth(Insumos);
