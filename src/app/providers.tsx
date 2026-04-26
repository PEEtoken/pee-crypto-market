
'use client';

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ReactNode, useEffect, useState } from 'react';

/**
 * @fileOverview Proveedor central de la dApp.
 * Asegura que el contexto de TON Connect esté disponible siempre.
 * El manifestUrl debe ser absoluto y accesible sin CORS.
 */
export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Nota: En producción, esta URL debe ser la del dominio real
  const manifestUrl = 'https://pee-crypto-market.vercel.app/tonconnect-manifest.json';

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {mounted ? (
        children
      ) : (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </TonConnectUIProvider>
  );
}
