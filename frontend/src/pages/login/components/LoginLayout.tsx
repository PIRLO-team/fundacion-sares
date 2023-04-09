// Local Components
import { SEO } from '@/components';

// Styles
import s from '../styles/Login.module.scss';

type TLoginLayout = {
  children: React.ReactNode;
  SEOTitle: string;
};

function LoginLayout({ children, SEOTitle }: TLoginLayout) {
  return (
    <>
      <SEO pageTitle={SEOTitle} />

      <div className={s.login}>
        <div className={s.login__content}>
          {/* <img
            src="/images/login.png"
            alt="logo"
            className={s.login__content__img}
            width="100%
          /> */}
        </div>
        <div className={s.login__form}>{children}</div>
      </div>
    </>
  );
}

export default LoginLayout;
