// React
import { FormEvent, useEffect, useState } from 'react';

// Next
import { useRouter } from 'next/router';

// Hooks
import { useAuthStore, useUsersStore } from '@/hooks';

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout, Loader } from '@/components';
import ChangePassword from '../components/ChangePassword/ChangePassword';

// UI Components
import { Avatar, Button, Input } from '@/components/ui';

// Styles
import s from '../styles/Perfil.module.scss';

// Sonner notification
import { toast } from 'sonner';

function Perfil() {
  const router = useRouter();
  const userID = router.query.id;

  const { currentUser } = useAuthStore();

  const {
    loading,
    activeUser,
    startGetUserById,
    setActiveUser,
    startSavingUser,
  } = useUsersStore();

  const FULLNAME = `${activeUser?.first_name} ${activeUser?.last_name}`;

  const [formUserState, setFormUserState] = useState({
    user_id: '',
    first_name: '',
    last_name: '',
    email: '',
    document: '',
    profession: '',
    phone: '',
    other_contact: '',
  });

  // onInputChange
  const onInputChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;

    setFormUserState({
      ...formUserState,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If data is equal to activeUser, do not update
    if (formUserState === activeUser) {
      return;
    }

    if (
      formUserState.document.length > 11 ||
      formUserState.document.length < 8
    ) {
      toast.error('La cedula debe tener entre 8 y 11 digitos');
      return;
    }

    if (formUserState.phone.length > 10 || formUserState.phone.length < 7) {
      toast.error('El contacto debe tener entre 7 y 10 digitos');
      return;
    }

    await startSavingUser(formUserState);
    await startGetUserById(userID as string);
  };

  useEffect(() => {
    if (userID) {
      startGetUserById(userID as string);
    }

    return () => {
      setActiveUser(null);
    };
  }, [userID]);

  useEffect(() => {
    if (activeUser !== null) {
      setFormUserState({
        user_id: activeUser.user_id,
        first_name: activeUser.first_name,
        last_name: activeUser.last_name,
        email: activeUser.email,
        document: activeUser.document,
        profession: activeUser.profession,
        phone: activeUser.phone,
        other_contact: activeUser.other_contact,
      });
    }
  }, [activeUser]);

  return (
    <Layout pageTitle="Perfil" roles={['1', '2', '3', '4', '5', '6']}>
      {loading ? (
        <Loader />
      ) : (
        <div className={s.profile}>
          <div className={s.profile__info__coverPhoto}>
            <img
              src={`https://source.boringavatars.com/bauhaus/120/${activeUser?.user_id}?square`}
              alt={FULLNAME}
              width="100%"
              className={s.profile__info__coverPhoto__img}
            />
          </div>

          <div className={s.profile__info}>
            <div className={s.profile__info__avatar}>
              <Avatar
                src={activeUser?.img_profile}
                name={FULLNAME}
                username={activeUser?.username}
                email={activeUser?.email}
                size={170}
                className={s.profile__info__avatar__item}
                classNameText={s.profile__info__avatar__item__name}
                classNameImg={s.profile__info__avatar__item__img}
              />
            </div>
          </div>

          <div className={s.profile__personalInfo}>
            <form
              className={s.profile__personalInfo__form}
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <p className={s.profile__personalInfo__form__text}>
                Informacion personal
              </p>

              <div className={s.profile__personalInfo__form__group}>
                <div>
                  <Input
                    disabled={userID !== currentUser.uid}
                    className={s.profile__personalInfo__form__group__input}
                    type="text"
                    name="first_name"
                    defaultValue={activeUser?.first_name}
                    maxLength={50}
                    inputType="secondary"
                    title="Nombre"
                    placeholder="Nombre"
                    onChange={onInputChange}
                  />
                </div>

                <div>
                  <Input
                    disabled={userID !== currentUser.uid}
                    className={s.profile__personalInfo__form__group__input}
                    type="text"
                    name="last_name"
                    defaultValue={activeUser?.last_name}
                    maxLength={50}
                    inputType="secondary"
                    title="Apellido(s)"
                    placeholder="Apellido(s)"
                    onChange={onInputChange}
                  />
                </div>
              </div>

              <div className={s.profile__personalInfo__form__group}>
                <div>
                  <Input
                    disabled={userID !== currentUser.uid}
                    className={s.profile__personalInfo__form__group__input}
                    type="text"
                    name="email"
                    defaultValue={activeUser?.email}
                    maxLength={250}
                    inputType="secondary"
                    title="Correo electrónico"
                    placeholder="Correo electrónico"
                    onChange={onInputChange}
                  />
                </div>

                <div>
                  <Input
                    disabled={userID !== currentUser.uid}
                    className={s.profile__personalInfo__form__group__input}
                    type="number"
                    name="document"
                    defaultValue={activeUser?.document}
                    inputType="secondary"
                    title="Cédula"
                    placeholder="Cédula"
                    onChange={onInputChange}
                  />
                </div>
              </div>

              <div className={s.profile__personalInfo__form__group}>
                <div>
                  <Input
                    disabled={userID !== currentUser.uid}
                    className={s.profile__personalInfo__form__group__input}
                    type="text"
                    name="profession"
                    defaultValue={activeUser?.profession}
                    maxLength={200}
                    inputType="secondary"
                    title="Profesión"
                    placeholder="Profesión"
                    onChange={onInputChange}
                  />
                </div>
                <div>
                  <Input
                    className={s.profile__personalInfo__form__group__input}
                    disabled
                    type="text"
                    name="role"
                    defaultValue={activeUser?.userRole.role_name}
                    inputType="secondary"
                    title="Rol"
                    placeholder="Rol"
                    onChange={onInputChange}
                  />
                </div>
              </div>

              <div className={s.profile__personalInfo__form__group}>
                <div>
                  <Input
                    disabled={userID !== currentUser.uid}
                    className={s.profile__personalInfo__form__group__input}
                    type="number"
                    name="phone"
                    defaultValue={activeUser?.phone}
                    inputType="secondary"
                    title="Telefono celular"
                    placeholder="Telefono celular"
                    onChange={onInputChange}
                  />
                </div>

                <div>
                  <Input
                    disabled={userID !== currentUser.uid}
                    className={s.profile__personalInfo__form__group__input}
                    type="text"
                    name="other_contact"
                    defaultValue={activeUser?.other_contact}
                    maxLength={200}
                    inputType="secondary"
                    title="Otro medio de contacto"
                    placeholder="Otro medio de contacto"
                    onChange={onInputChange}
                  />
                </div>
              </div>

              {userID === currentUser.uid && (
                <div className={s.profile__personalInfo__form__group__button}>
                  <Button
                    className={
                      s.profile__personalInfo__form__group__button__item
                    }
                    type="submit"
                  >
                    Guardar cambios
                  </Button>
                </div>
              )}
            </form>

            {userID === currentUser.uid && (
              <div className={s.profile__personalInfo__security}>
                <>
                  <p className={s.profile__personalInfo__form__text}>
                    Seguridad
                  </p>

                  <ChangePassword />
                </>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default withAuth(Perfil);
