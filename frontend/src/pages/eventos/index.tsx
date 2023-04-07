// Next

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout } from '@/components';

// Styles
import s from './styles/Eventos.module.scss';

function Eventos() {
  return (
    <Layout pageTitle="Inicio">
      <h1>Eventos</h1>
    </Layout>
  );
}

export default withAuth(Eventos);
