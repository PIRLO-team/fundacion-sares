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
    <Layout pageTitle="Inicio" roles={['1', '2', '3', '4', '5', '6']}>
      <h1>Inicio</h1>
    </Layout>
  );
}

export default withAuth(Home);
