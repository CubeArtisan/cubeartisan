import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>CubeArtisan</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="A mockup of CubeArtisan built with Next 13 and TailwindCSS"
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/social">Social</Link>
            </li>
            <li>
              <Link href="/user/jesseb34r/cubes">Your Cubes</Link>
            </li>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
