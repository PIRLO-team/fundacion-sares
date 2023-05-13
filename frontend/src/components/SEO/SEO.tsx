// Next
import Head from 'next/head';

type TSEO = {
  pageTitle: string;
};

export function SEO({ pageTitle }: TSEO) {
  // Page Title
  const message = `SARES - ${pageTitle}`;

  return (
    <Head>
      <title>{message}</title>

      <meta name="title" content={message} />
      <meta name="description" content={`${pageTitle} - Fundación SARES`} />

      <meta
        name="viewport"
        content="width=device-width, minimal-ui, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
      <meta name="apple-mobile-web-app-capable" content="yes" />

      <link rel="icon" href="/logo/sares/logo_small_icon.png" />
    </Head>
  );
}
