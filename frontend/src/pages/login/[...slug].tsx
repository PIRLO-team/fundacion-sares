// React
import { FormEvent, useEffect } from 'react';

// Next
import { useRouter } from 'next/router';

// Hooks
import { useAuthStore, useForm } from '@/hooks';

// Local Components
import LoginLayout from './components/LoginLayout';
import CancelAction from './components/CancelAction/CancelAction';

// UI Components
import { Button, Input } from '@/components/ui';

// Styles
import s from './styles/Login.module.scss';

// Sonner Notifications
import { toast } from 'sonner';

function Reset() {
  const router = useRouter();

  const user = router.query.user;
  const code = router.query.code;

  const { startResetPassword } = useAuthStore();

  const { password1, password2, onInputChange, formState } = useForm({
    password1: '',
    password2: '',
  });

  const onReset = (e: FormEvent) => {
    e.preventDefault();

    // alert if password < 7 characters
    if (password1.length < 7) {
      toast.error('La contraseña debe tener al menos 7 caracteres');
      return;
    }

    //  Alert if passwords are not equal
    if (password1 !== password2) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    startResetPassword({
      user: user as string,
      code: code as string,
      password: password1,
      confirmPassword: password2,
    });
  };

  useEffect(() => {
    if (user === undefined || code === undefined) {
      router.replace('/login');
    }
  }, [user, code, router]);

  return (
    <LoginLayout SEOTitle="Reestablecer contraseña">
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
        onSubmit={onReset}
        autoComplete="off"
      >
        <Input
          className={s.login__form__group__input}
          required
          type="password"
          name="password1"
          value={password1}
          inputType="secondary"
          title="Ingrese su nueva contraseña"
          placeholder="Ingrese su nueva contraseña"
          onChange={onInputChange}
        />

        <Input
          className={s.login__form__group__input}
          required
          type="password"
          name="password2"
          value={password2}
          inputType="secondary"
          title="Confirme su nueva contraseña"
          placeholder="Confirme su nueva contraseña"
          onChange={onInputChange}
        />

        <Button className={s.login__form__group__button} type="submit">
          Reestablecer contraseña
        </Button>
      </form>

      <CancelAction />
    </LoginLayout>
  );
}

export default Reset;
