// Next

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout } from '@/components';

// Styles
import s from './styles/Voluntarios.module.scss';

function Voluntarios() {
  return (
    <Layout pageTitle="Inicio">
      <h1>Voluntarios</h1>
    </Layout>
  );
}

export default withAuth(Voluntarios);
