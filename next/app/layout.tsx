import type { ReactNode } from 'react';

import Footer from '@cubeartisan/next/app/Footer';
import Navbar from '@cubeartisan/next/app/Navbar';
import '@cubeartisan/next/app/globals.css';

const RootLayout = ({ children }: { children: ReactNode }) => (
  <html lang="en">
    <head>
      <title>CubeArtisan</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="A mockup of CubeArtisan built with Next 13 and TailwindCSS" />
      <link rel="icon" href="/favicon.ico" />
    </head>
    <body>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </body>
  </html>
);

export default RootLayout;
