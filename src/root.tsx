// @refresh reload
import { Routes } from '@solidjs/router';
import { Suspense } from 'solid-js';
import { FileRoutes, Head, Meta, Scripts, Title } from 'solid-start';
import { ErrorBoundary } from 'solid-start/error-boundary';

export default function Root() {
  return (
    <html lang="en">
      <Head>
        <Title>SolidStart - With Vitest</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body>
        <ErrorBoundary>
          <Suspense>
            <Routes>
              <FileRoutes />
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </body>
    </html>
  );
}
