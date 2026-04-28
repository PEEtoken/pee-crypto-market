
import type { Metadata } from 'next';
import './globals.css';
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: 'PEE Crypto Market: El Primer Supermercado Cripto de la Comunidad en la Red TON',
  description: 'Únete al movimiento PEE Crypto Market. Con solo 1 dólar, construye el primer supermercado global.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
