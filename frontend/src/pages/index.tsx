// Next

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout } from '@/components';

// UI Components
// import { Avatar } from '@/components/ui';

// Styles
// import s from '@/styles/Home.module.scss';

function Home() {
  return (
    <Layout pageTitle="Inicio">
      <h1>Inicio</h1>
    </Layout>
  );
}

export default withAuth(Home);
