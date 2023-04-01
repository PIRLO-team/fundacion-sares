// React
import { FormEvent, useEffect, useMemo } from 'react';

// Next
import { useRouter } from 'next/router';

// Hooks
import { useAuthStore, useForm } from '@/hooks';

// UI Components
import { Button, Input } from '@/components/ui';

// Local Components
import { SEO } from '@/components';

// Styles
import s from './styles/Login.module.scss';

function Login() {
  const { status, currentUser, startLogin } = useAuthStore();

  const router = useRouter();

  const { email, password, onInputChange } = useForm({
    email: '',
    password: '',
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onLogin = (e: FormEvent) => {
    e.preventDefault();

    startLogin({ email, password });
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [currentUser, status, router]);

  return (
    <>
      <SEO pageTitle="Login" />

      <div className={s.login}>
        <div className={s.login__content}>
          {/* <img
            src="/images/login.png"
            alt="logo"
            className={s.login__content__img}
            width="100%"
          /> */}
        </div>
        <div className={s.login__form}>
          <div className={s.login__form__header}>
            <img
              src="/logo/sares/Logo.png"
              alt="logo"
              className={s.login__form__header__logo}
              width="100%"
            />
          </div>

          <form
            className={s.login__form__group}
            onSubmit={onLogin}
            autoComplete="off"
          >
            <Input
              className={s.login__form__group__input}
              required
              type="text"
              name="email"
              value={email}
              inputType="secondary"
              title="Nombre de usuario"
              placeholder="Nombre de usuario"
              onChange={onInputChange}
            />

            <Input
              className={s.login__form__group__input}
              required
              type="password"
              name="password"
              value={password}
              inputType="secondary"
              title="Contraseña"
              placeholder="Contraseña"
              onChange={onInputChange}
            />

            <Button
              className={s.login__form__group__button}
              type="submit"
              disabled={isAuthenticating}
            >
              Iniciar sesión
            </Button>
          </form>

          <div className={s.login__form__footer}>
            <p className={s.login__form__footer__text}>
              Olvidaste la contraseña?{' '}
              <a
                href="https://sac.uao.edu.co/"
                className={s.login__form__footer__link}
              >
                Restablecer
              </a>
            </p>

            <div className={s.login__form__footer__line} />

            {/* <a
              href="https://www.uao.edu.co/wp-content/uploads/2022/01/politica-proteccion-datos-uao-4.pdf"
              target="__blank"
              rel="noreferrer noopener"
            > */}
            <p className={s.login__form__footer__text__link}>
              Política de tratamiento de Datos Personales
            </p>
            {/* </a> */}

            <p className={s.login__form__footer__text}>© 2023 PIRLO 420.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
