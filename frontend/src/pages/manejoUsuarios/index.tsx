// React
import { FormEvent, useEffect, useState } from 'react';

// Next

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout, Loader, Table } from '@/components';

// Local Components
import { Button, Input, Select } from '@/components/ui';

// Hooks
import { useUsersStore } from '@/hooks';

// Sonner Notification
import { toast } from 'sonner';

// Styles
import s from './styles/manejoUsuarios.module.scss';

function ManejoUsuarios() {
  // UseUsersStore
  const {
    users,
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

  // Table headers
  const tableHeaders = ['NOMBRE', 'ROL DE CARGO', 'ESTADO', 'ACCIONES'];

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
    <Layout pageTitle="Inicio">
      <h1 className={s.manejoUsuarios__title}>Usuarios</h1>

      <div className={s.manejoUsuarios}>
        <div className={s.manejoUsuarios__table}>
          {loading ? <Loader /> : <Table headers={tableHeaders} data={users} />}
        </div>

        <form
          className={s.manejoUsuarios__createUser}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h3>Manejo de usuario</h3>

          <Input
            readOnly={loadingCreate}
            inputType="secondary"
            type="text"
            title="Nombre"
            name="first_name"
            value={formState.first_name}
            onChange={onInputChange}
            className={s.manejoUsuarios__createUser__input}
          />

          <Input
            readOnly={loadingCreate}
            inputType="secondary"
            type="text"
            title="Apellido"
            name="last_name"
            value={formState.last_name}
            onChange={onInputChange}
            className={s.manejoUsuarios__createUser__input}
          />

          <Input
            disabled={!!activeUser}
            readOnly={loadingCreate}
            inputType="secondary"
            type="email"
            title="Correo electrónico"
            name="email"
            value={formState.email}
            onChange={onInputChange}
            className={s.manejoUsuarios__createUser__input}
          />

          <Input
            readOnly={loadingCreate}
            inputType="secondary"
            type="text"
            title="Profesión"
            name="profession"
            value={formState.profession}
            onChange={onInputChange}
            className={s.manejoUsuarios__createUser__input}
          />

          <Select
            readOnly={loadingCreate}
            disabled={activeUser?.userRole.role_id === '1'}
            SelectType="secondary"
            title="Perfil profesional"
            name="user_role"
            value={
              activeUser ? formState.userRole.role_id : formState?.user_role
            }
            onChange={onInputChange}
            className={s.manejoUsuarios__createUser__input}
          >
            <option value="">-- Seleccionar perfil --</option>
            <option value="1">Administrador</option>
            <option value="2">Personal de Bodega</option>
            <option value="3">Médico</option>
            <option value="4">Coordinador Logístico</option>
            <option value="5">Coordinador de Formación</option>
            <option value="6">Coordinador Operativo</option>
          </Select>

          {loadingCreate && <Loader />}

          <div className={s.manejoUsuarios__createUser__button}>
            <Button
              type="submit"
              className={s.manejoUsuarios__createUser__button__create}
              disabled={loadingCreate}
            >
              Crear Usuario
            </Button>

            <Button
              disabled={loadingCreate}
              type="button"
              className={s.manejoUsuarios__createUser__button__clear}
              onClick={handleClearForm}
              icon="/icons/Actions/clear.png"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default withAuth(ManejoUsuarios);
