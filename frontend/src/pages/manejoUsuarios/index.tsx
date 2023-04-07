// Next

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout } from '@/components';

// Styles
import s from './styles/ManejoUsuarios.module.scss';

function ManejoUsuarios() {
  return (
    <Layout pageTitle="Inicio">
      <h1>ManejoUsuarios</h1>
    </Layout>
  );
}

export default withAuth(ManejoUsuarios);
