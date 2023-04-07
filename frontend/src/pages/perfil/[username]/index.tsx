// React
// import { useEffect } from 'react';

// Next
import Image from 'next/image';
import { useRouter } from 'next/router';

// Hooks
import { useAuthStore, useForm } from '@/hooks';

// Local Components
import { withAuth } from '@/auth/withAuth';
import { Layout } from '@/components';

// UI Components
import { Avatar, Button, Input } from '@/components/ui';

// Styles
import s from '../styles/Perfil.module.scss';

// Types
// import { TActivity } from '@/utils/types';

function Perfil() {
  const router = useRouter();

  const username = router.query.username;

  const { currentUser, startLogout } = useAuthStore();

  const { name, email, id, profession, role, tel, other_tel, onInputChange } =
    useForm({
      name: '',
      email: '',
      id: '',
      profession: '',
      role: '',
      tel: '',
      other_tel: '',
    });

  return (
    <Layout pageTitle="Perfil">
      <div className={s.profile}>
        <div className={s.profile__info}>
          <div className={s.profile__info__coverPhoto}>
            <img
              src={
                currentUser?.coverPhotoURL ||
                `https://source.boringavatars.com/bauhaus/120/${currentUser.name}?square`
              }
              alt={currentUser?.name}
              width="100%"
              className={s.profile__info__coverPhoto__img}
            />
          </div>

          <div className={s.profile__info__avatar}>
            <Avatar
              src={currentUser?.photoURL}
              name={currentUser?.name}
              username={currentUser?.username}
              email={currentUser?.email}
              size={170}
              className={s.profile__info__avatar__item}
              classNameText={s.profile__info__avatar__item__text}
              classNameImg={s.profile__info__avatar__item__img}
            />
          </div>
        </div>

        <div className={s.profile__personalInfo}>
          <form className={s.profile__personalInfo__form} autoComplete="off">
            <p className={s.profile__personalInfo__form__text}>
              Informacion personal
            </p>

            <Input
              className={s.profile__personalInfo__form__group__input}
              required
              type="text"
              name="name"
              value={name}
              inputType="secondary"
              title="Nombre completo"
              placeholder="Nombre completo"
              onChange={onInputChange}
            />

            <div className={s.profile__personalInfo__form__group}>
              <div>
                <Input
                  className={s.profile__personalInfo__form__group__input}
                  required
                  type="text"
                  name="email"
                  value={email}
                  inputType="secondary"
                  title="Correo electrónico"
                  placeholder="Correo electrónico"
                  onChange={onInputChange}
                />
              </div>

              <div>
                <Input
                  className={s.profile__personalInfo__form__group__input}
                  required
                  type="number"
                  name="id"
                  value={id}
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
                  className={s.profile__personalInfo__form__group__input}
                  required
                  type="text"
                  name="profession"
                  value={profession}
                  inputType="secondary"
                  title="Profesión"
                  placeholder="Profesión"
                  onChange={onInputChange}
                />
              </div>
              <div>
                <Input
                  className={s.profile__personalInfo__form__group__input}
                  required
                  type="text"
                  name="role"
                  value={role}
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
                  className={s.profile__personalInfo__form__group__input}
                  required
                  type="tel"
                  name="tel"
                  value={tel}
                  inputType="secondary"
                  title="Telefono celular"
                  placeholder="Telefono celular"
                  onChange={onInputChange}
                />
              </div>

              <div>
                <Input
                  className={s.profile__personalInfo__form__group__input}
                  required
                  type="tel"
                  name="other_tel"
                  value={other_tel}
                  inputType="secondary"
                  title="Otro medio de contacto"
                  placeholder="Otro medio de contacto"
                  onChange={onInputChange}
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

          <div>
            {currentUser.username === username && (
              <>
                {/* <Button href={`/perfil/${username}/ajustes`}>Ajustes</Button> */}
                <Button
                  onClick={() => {
                    startLogout();
                  }}
                >
                  Cerrar sesion
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default withAuth(Perfil);
