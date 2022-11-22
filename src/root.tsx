// @refresh reload
import { Suspense } from 'solid-js';
import { Body, ErrorBoundary, FileRoutes, Head, Html, Link, Meta, Routes, Scripts, Title } from 'solid-start';

import Nav from '@cubeartisan/cubeartisan/components/Nav';

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>CubeArtisan</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta name="description" content="CubeArtisan beta" />
        <Link rel="manifest" href="/manifest.webmanifest" />
      </Head>
      <Body>
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
