// Next
import { useRouter } from 'next/router';

// Local Components
// import { withAuth } from '@/auth/withAuth';
import { Layout } from '@/components';

// Hooks
import { useAuthStore } from '@/hooks';

function Ajustes() {
  const router = useRouter();
  const username = router.query.username;

  const { currentUser } = useAuthStore();

  // if (user.username !== username) {
  //   router.replace('/');
  // }

  return (
    <Layout pageTitle="Ajustes">
      <h1>Ajustes de {username}</h1>
    </Layout>
  );
}

export default Ajustes;
