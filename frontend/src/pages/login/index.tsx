// React
import { FormEvent, useEffect, useMemo } from 'react';

// Next
import { useRouter } from 'next/router';

// Hooks
import { useAuthStore, useForm } from '@/hooks';

// HOC - Higher Order Components
import { withAuth } from '@/auth/withAuth';

// Local Components
import LoginLayout from './components/LoginLayout';

// UI Components
import { Button, Input } from '@/components/ui';

// Styles
import s from './styles/Login.module.scss';
import Link from 'next/link';

function Login() {
  const { status, currentUser, startLogin } = useAuthStore();

  const router = useRouter();

  const { user, password, onInputChange } = useForm({
    user: '',
    password: '',
  });

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onLogin = (e: FormEvent) => {
    e.preventDefault();

    startLogin({ user, password });
  };

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/');
    }
  }, [currentUser, status, router]);

  return (
    <LoginLayout SEOTitle="Inicio de sesion">
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
          name="user"
          value={user}
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
          <Link
            href="/login/steps/step1"
            className={s.login__form__footer__text__link}
          >
            Restablecer
          </Link>
        </p>

        <div className={s.login__form__footer__line} />

        {/* <a
              href="https://www.uao.edu.co/wp-content/uploads/2022/01/politica-proteccion-datos-uao-4.pdf"
              target="__blank"
              rel="noreferrer noopener"
            > */}
        <p className={s.login__form__footer__text}>
          Política de tratamiento de Datos Personales
        </p>
        {/* </a> */}

        <p className={s.login__form__footer__text}>© 2023 PIRLO 420.</p>
      </div>
    </LoginLayout>
  );
}

export default withAuth(Login);
