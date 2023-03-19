// Local Components
import { Sidebar, SEO } from '../';

// Styles
import s from './Layout.module.scss';

type TLayout = {
  children: React.ReactNode;
  pageTitle: string;
};

export function Layout({ children, pageTitle }: TLayout) {
  return (
    <div>
      <SEO pageTitle={pageTitle} />
      <div className={s.flex}>
        <Sidebar />
        <div className={s.container}>{children}</div>
      </div>
    </div>
  );
}
