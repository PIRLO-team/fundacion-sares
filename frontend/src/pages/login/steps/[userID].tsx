// Next
import { useRouter } from 'next/router';

// Hooks
import { useAuthStore, useForm } from '@/hooks';

// Local Components
import LoginLayout from '../components/LoginLayout';

// UI Components
import { Button, Input } from '@/components/ui';

// Styles
import s from '../styles/Login.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Loader } from '@/components';

export default function Step2() {
  const router = useRouter();

  const userID = router.query.user;

  const [countDown, setCoundDown] = useState(20);

  const { code, onInputChange } = useForm({
    code: '',
  });

  const { loading, startResetPasswordStep2, resendCode } = useAuthStore();

  const codeConfirmation = Number(code);

  const resenVerificationCode = () => {
    resendCode(userID as string);
    setCoundDown(30);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    startResetPasswordStep2({
      user: userID as string,
      code: codeConfirmation,
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCoundDown(countDown - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDown]);

  useEffect(() => {
    if (userID === undefined) {
      router.push('/login');
    }
  }, [countDown]);

  return (
    <LoginLayout SEOTitle="Reset Password Step1">
      <div className={s.login__form__header}>
        <img
          src="/logo/sares/Logo.png"
          alt="logo"
          className={s.login__form__header__logo}
          width="100%"
        />
      </div>

      <form onSubmit={handleSubmit} className={s.login__form__group}>
        <h1 className={s.login__form__group__title}>
          Ingresa el código de verificación
        </h1>
        <p className={s.login__form__group__text}>
          Por favor ingresa el código de cuatro dígitos que fue enviado a tu
          correo.
        </p>

        <Input
          required
          type="number"
          name="code"
          value={code}
          inputType="secondary"
          title="Ingrese el codigo de verificacion"
          placeholder="Ingrese el codigo de verificacion"
          onChange={onInputChange}
        />

        <Button
          disabled={code.length < 4}
          type="submit"
          className={s.login__form__group__button}
        >
          Validar Codigo
        </Button>

        <br />

        {loading && <Loader />}
      </form>

      <div className={s.login__form__footer}>
        <p className={s.login__form__footer__text}>
          ¿No recibiste el código?{' '}
          {countDown > 0 ? (
            <span className={s.login__form__footer__text__link__disabled}>
              Nuevo codigo en {countDown}
            </span>
          ) : (
            <strong
              className={s.login__form__footer__text__link}
              onClick={resenVerificationCode}
            >
              Reenviar código
            </strong>
          )}
        </p>
      </div>
    </LoginLayout>
  );
}