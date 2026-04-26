
"use client";

import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';

/**
 * @fileOverview Proveedor de TON Connect optimizado para Next.js.
 * Asegura que el manifestUrl sea accesible y que el contexto esté disponible 
 * para todos los componentes de la aplicación.
 */
export function TonProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // El manifestUrl debe ser absoluto para máxima compatibilidad con wallets móviles.
  // En producción, esto debería apuntar a la URL real del despliegue.
  const manifestUrl = "https://pee-crypto-market.vercel.app/tonconnect-manifest.json";

  if (!mounted) return <>{children}</>;

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      {children}
    </TonConnectUIProvider>
  );
}
