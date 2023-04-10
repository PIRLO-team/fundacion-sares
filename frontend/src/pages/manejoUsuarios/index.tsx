// React
import { useEffect, useState } from 'react';

// Next

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout, Loader, Table } from '@/components';

// Local Components
import { Button, Input, Select } from '@/components/ui';

// Hooks
import { useForm, useAuthStore } from '@/hooks';

// Sonner Notification
import { toast } from 'sonner';

// Styles
import s from './styles/manejoUsuarios.module.scss';

// Fake data
import { users } from '@/data/users';

function ManejoUsuarios() {
  // UseAuthStore
  const { loading, startCreateUser } = useAuthStore();

  // Table headers
  const tableHeaders = ['NOMBRE', 'ROL DE CARGO', 'ESTADO', 'ACCIONES'];

  // Clear buttton state
  const [openClearButton, setOpenClearButton] = useState(false);

  // UseForm
  const { onInputChange, onResetForm, formState } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    profession: '',
    user_role: '',
  });

  // OnSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(formState).some((value) => value === '')) {
      toast.error('Todos los campos son obligatorios');
      return;
    }

    await startCreateUser(formState);
    onResetForm();
  };

  // Check form for clear button
  useEffect(() => {
    if (Object.values(formState).some((value) => value !== '')) {
      setOpenClearButton(true);
    } else {
      setOpenClearButton(false);
    }
  }, [formState]);

  return (
    <Layout pageTitle="Inicio">
      <h1 className={s.manejoUsuarios__title}>Usuarios</h1>

      <br />

      <div className={s.manejoUsuarios}>
        <div className={s.manejoUsuarios__table}>
          <Table headers={tableHeaders} data={users} />
        </div>

        <form
          className={s.manejoUsuarios__createUser}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <h3>Manejo de usuario</h3>

          <Input
            readOnly={loading}
            inputType="secondary"
            type="text"
            title="Nombre"
            name="first_name"
            value={formState.first_name}
            onChange={onInputChange}
            className={s.manejoUsuarios__createUser__input}
          />

          <Input
            readOnly={loading}
            inputType="secondary"
            type="text"
            title="Apellido"
            name="last_name"
            value={formState.last_name}
            onChange={onInputChange}
            className={s.manejoUsuarios__createUser__input}
          />

          <Input
            readOnly={loading}
            inputType="secondary"
            type="email"
            title="Correo electrónico"
            name="email"
            value={formState.email}
            onChange={onInputChange}
            className={s.manejoUsuarios__createUser__input}
          />

          <Input
            readOnly={loading}
            inputType="secondary"
            type="text"
            title="Profesión"
            name="profession"
            value={formState.profession}
            onChange={onInputChange}
            className={s.manejoUsuarios__createUser__input}
          />

          <Select
            SelectType="secondary"
            title="Perfil profesional"
            name="user_role"
            value={formState.user_role}
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

          {loading && <Loader />}

          <div className={s.manejoUsuarios__createUser__button}>
            <Button
              type="submit"
              className={s.manejoUsuarios__createUser__button__create}
              disabled={loading}
            >
              Crear Usuario
            </Button>

            {openClearButton && (
              <Button
                disabled={loading}
                type="button"
                className={s.manejoUsuarios__createUser__button__clear}
                onClick={onResetForm}
                icon="/icons/Actions/clear.png"
              />
            )}
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default withAuth(ManejoUsuarios);
