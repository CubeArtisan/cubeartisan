import Footer from "./Footer";
import "./globals.css";
import Navbar from "./Navbar";

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
      <body className="mx-auto [width:clamp(100px,_80%,_1024px)]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
