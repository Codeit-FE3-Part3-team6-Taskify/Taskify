import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <link href="https://fonts.cdnfonts.com/css/montserrat" rel="stylesheet" />
      <link
        rel="stylesheet"
        as="style"
        // eslint-disable-next-line react/no-unknown-property
        crossorigin
        href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
      />

      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
