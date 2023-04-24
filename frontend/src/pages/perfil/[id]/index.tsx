// React
import { FormEvent, useEffect } from 'react';

// Next
import { useRouter } from 'next/router';

// Hooks
import { useAuthStore, useForm, useUsersStore } from '@/hooks';

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout, Loader } from '@/components';

// UI Components
import { Avatar, Button, Input } from '@/components/ui';

// Styles
import s from '../styles/Perfil.module.scss';

// Types

function Perfil() {
  const router = useRouter();

  const userID = router.query.id;

  const { loading, activeUser, startGetUserById, setActiveUser } =
    useUsersStore();

  const FULLNAME = `${activeUser?.first_name} ${activeUser?.last_name}`;

  const { onInputChange: handleInputChange, formState } = useForm({
    name: '',
    document: '',
    email: '',
    profession: '',
    phone: '',
    other_contact: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formState);
  };

  useEffect(() => {
    if (userID) {
      startGetUserById(userID as string);
    }

    return () => {
      setActiveUser(null);
    };
  }, []);

  return (
    <Layout pageTitle="Perfil">
      {loading ? (
        <Loader />
      ) : (
        <div className={s.profile}>
          <div className={s.profile__info__coverPhoto}>
            <img
              src={
                activeUser?.coverPhotoURL ??
                `https://source.boringavatars.com/bauhaus/120/${activeUser?.username}?square`
              }
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

              <Input
                className={s.profile__personalInfo__form__group__input}
                type="text"
                name="name"
                defaultValue={FULLNAME}
                inputType="secondary"
                title="Nombre completo"
                placeholder="Nombre completo"
                onChange={handleInputChange}
              />

              <div className={s.profile__personalInfo__form__group}>
                <div>
                  <Input
                    className={s.profile__personalInfo__form__group__input}
                    type="text"
                    name="email"
                    defaultValue={activeUser?.email}
                    inputType="secondary"
                    title="Correo electrónico"
                    placeholder="Correo electrónico"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Input
                    className={s.profile__personalInfo__form__group__input}
                    type="number"
                    name="document"
                    defaultValue={activeUser?.document}
                    inputType="secondary"
                    title="Cédula"
                    placeholder="Cédula"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={s.profile__personalInfo__form__group}>
                <div>
                  <Input
                    className={s.profile__personalInfo__form__group__input}
                    type="text"
                    name="profession"
                    defaultValue={activeUser?.profession}
                    inputType="secondary"
                    title="Profesión"
                    placeholder="Profesión"
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={s.profile__personalInfo__form__group}>
                <div>
                  <Input
                    className={s.profile__personalInfo__form__group__input}
                    type="tel"
                    name="phone"
                    defaultValue={activeUser?.phone}
                    inputType="secondary"
                    title="Telefono celular"
                    placeholder="Telefono celular"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Input
                    className={s.profile__personalInfo__form__group__input}
                    type="tel"
                    name="other_contact"
                    defaultValue={activeUser?.other_contact}
                    inputType="secondary"
                    title="Otro medio de contacto"
                    placeholder="Otro medio de contacto"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className={s.profile__personalInfo__form__group__button}>
                <Button
                  className={s.profile__personalInfo__form__group__button__item}
                  type="submit"
                >
                  Guardar cambios
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default withAuth(Perfil);
