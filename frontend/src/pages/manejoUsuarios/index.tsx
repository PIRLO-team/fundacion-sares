// React
import { FormEvent, useEffect, useState } from 'react';

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout, Loader } from '@/components';
import UserTable from './components/UserTable';

// Hooks
import { useUsersStore } from '@/hooks';

// Sonner Notification
import { toast } from 'sonner';

// Styles
import s from './styles/manejoUsuarios.module.scss';
import UserDrawer from './components/UserDrawer';

function ManejoUsuarios() {
  // UseUsersStore
  const {
    loading,
    loadingCreate,
    activeUser,
    setActiveUser,
    startLoadingUsers,
    startSavingUser,
  } = useUsersStore();

  const [formState, setFormState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    profession: '',
    userRole: {
      role_name: '',
      role_id: '',
      role_description: '',
    },
    user_role: '',
  });

  // onInputChange
  const onInputChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // OnSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formState).some((value) => value === '')) {
      toast.error('Todos los campos son obligatorios');
      console.log(formState);
      return;
    }

    await startSavingUser(formState);
    startLoadingUsers();
    handleClearForm();
  };

  // Clear form
  const handleClearForm = () => {
    setFormState({
      first_name: '',
      last_name: '',
      email: '',
      profession: '',
      userRole: {
        role_name: '',
        role_id: '',
        role_description: '',
      },
      user_role: '',
    });

    setActiveUser(null);
  };

  useEffect(() => {
    startLoadingUsers();
  }, []);

  useEffect(() => {
    if (activeUser !== null) {
      setFormState(activeUser as any);
    }
  }, [activeUser]);

  return (
    <Layout pageTitle="Manejo de usuarios">
      <div className={s.manejoUsuarios}>
        <div className={s.manejoUsuarios__header}>
          <h1 className={s.manejoUsuarios__title}>Usuarios</h1>
          <UserDrawer />
        </div>
        <div className={s.manejoUsuarios__table}>
          {loading ? <Loader /> : <UserTable />}
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(ManejoUsuarios);
