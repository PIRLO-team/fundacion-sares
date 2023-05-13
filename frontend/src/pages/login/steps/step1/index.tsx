// Hooks
import { useAuthStore, useForm } from '@/hooks';

// Local Components
import LoginLayout from '../../components/LoginLayout';
import CancelAction from '../../components/CancelAction/CancelAction';
import { Loader } from '@/components';

// UI Components
import { Button, Input } from '@/components/ui';

// Styles
import s from '../../styles/Login.module.scss';

export default function Step1() {
  const { email, onInputChange } = useForm({
    email: '',
  });

  const { loading, startResetPasswordStep1 } = useAuthStore();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    startResetPasswordStep1(email);
  };

  return (
    <>
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
            ¿Olvidaste tu contraseña?
          </h1>
          <p className={s.login__form__group__text}>
            No te preocupes, te enviaremos las instrucciones para reestablecer
            tu cuenta.
          </p>

          <Input
            required
            type="text"
            name="email"
            value={email}
            inputType="secondary"
            title="Ingrese su correo electronico"
            placeholder="Ingrese su correo electronico"
            onChange={onInputChange}
          />

          <Button type="submit" className={s.login__form__group__button}>
            Reestablecer contraseña
          </Button>

          <br />

          {loading && <Loader />}
        </form>

        <CancelAction />
      </LoginLayout>
    </>
  );
}
