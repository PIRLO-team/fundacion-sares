// React

// Next
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

function Perfil() {
  const router = useRouter();

  const username = router.query.username;

  const { currentUser, startLogout } = useAuthStore();

  const { onInputChange: handleInputChange } = useForm({
    name: '',
    email: '',
    profession: '',
    role: '',
    phone: '',
    other_contact: '',
  });

  return (
    <Layout pageTitle="Perfil">
      <div className={s.profile}>
        <div className={s.profile__info__coverPhoto}>
          <img
            src={
              currentUser?.coverPhotoURL ??
              `https://source.boringavatars.com/bauhaus/120/${currentUser.name}?square`
            }
            alt={currentUser?.name}
            width="100%"
            className={s.profile__info__coverPhoto__img}
          />
        </div>

        <div className={s.profile__info}>
          <div className={s.profile__info__avatar}>
            <Avatar
              src={currentUser?.img_profile}
              name={currentUser?.name}
              username={currentUser?.username}
              email={currentUser?.email}
              size={170}
              className={s.profile__info__avatar__item}
              classNameText={s.profile__info__avatar__item__name}
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
              //
              disabled
              type="text"
              name="name"
              defaultValue={currentUser?.name}
              inputType="secondary"
              title="Nombre completo"
              placeholder="Nombre completo"
              onChange={handleInputChange}
            />

            <div className={s.profile__personalInfo__form__group}>
              <div>
                <Input
                  className={s.profile__personalInfo__form__group__input}
                  //
                  disabled
                  type="text"
                  name="email"
                  defaultValue={currentUser?.email}
                  inputType="secondary"
                  title="Correo electrónico"
                  placeholder="Correo electrónico"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Input
                  className={s.profile__personalInfo__form__group__input}
                  //
                  disabled
                  type="number"
                  name="uid"
                  defaultValue={currentUser?.uid}
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
                  //
                  disabled
                  type="text"
                  name="profession"
                  defaultValue={currentUser?.profession}
                  inputType="secondary"
                  title="Profesión"
                  placeholder="Profesión"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Input
                  className={s.profile__personalInfo__form__group__input}
                  //
                  disabled
                  type="text"
                  name="role"
                  defaultValue={currentUser?.role.role_name}
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
                  //
                  disabled
                  type="tel"
                  name="phone"
                  defaultValue={currentUser?.phone}
                  inputType="secondary"
                  title="Telefono celular"
                  placeholder="Telefono celular"
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <Input
                  className={s.profile__personalInfo__form__group__input}
                  //
                  disabled
                  type="tel"
                  name="other_contact"
                  defaultValue={currentUser?.other_contact}
                  inputType="secondary"
                  title="Otro medio de contacto"
                  placeholder="Otro medio de contacto"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* <div className={s.profile__personalInfo__form__group__button}>
              <Button
                className={s.profile__personalInfo__form__group__button__item}
                type="submit"
                disabled
              >
                Guardar cambios
              </Button>
            </div> */}
          </form>

          <div>
            {currentUser.username === username && (
              <>
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
