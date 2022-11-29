// @refresh reload
import { Suspense } from 'solid-js';
import { Body, ErrorBoundary, FileRoutes, Head, Html, Link, Meta, Routes, Scripts, Title } from 'solid-start';

import Nav from '@cubeartisan/cubeartisan/components/Nav';
import '@cubeartisan/cubeartisan/styles/preflight.css'; // css reset from tailwind
import '@cubeartisan/cubeartisan/styles/globalStyles.css';
import { baseTheme } from '@cubeartisan/cubeartisan/styles';

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>CubeArtisan</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="description" content="CubeArtisan beta" />
        <Meta name="apple-mobile-web-app-title" content="CubeArtisan" />
        <Meta name="application-name" content="CubeArtisan" />
        <Meta name="msapplication-TileColor" content="#666666" />
        <Meta name="msapplication-config" content="/images/icons/browserconfig.xml" />
        <Meta name="theme-color" content="#666666" />
        <Link rel="manifest" href="/manifest.webmanifest" />
        <Link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-touch-icon.png" />
        <Link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png" />
        <Link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png" />
        <Link rel="mask-icon" href="/images/icons/safari-pinned-tab.svg" color="#7155a3" />
        <Link rel="shortcut icon" href="/images/icons/favicon.ico" />
      </Head>
      <Body class={baseTheme}>
        <Nav />
        <ErrorBoundary>
          <Suspense>
            <Routes>
              <FileRoutes />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </Body>
    </Html>
  );
}
