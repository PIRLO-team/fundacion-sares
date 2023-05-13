// React

// Next

// Hooks

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout } from '@/components';

// Styles
import s from './styles/Botiquines.module.scss';

function Botiquines() {
  return (
    <Layout pageTitle="Botiquines" roles={['1', '2', '3', '4', '6']}>
      <h1>Botiquines</h1>
    </Layout>
  );
}

export default withAuth(Botiquines);
