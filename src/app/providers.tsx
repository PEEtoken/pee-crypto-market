
"use client";

import { TonConnectUIProvider } from "@tonconnect/ui-react";

/**
 * @fileOverview Proveedor central de la dApp.
 * Configura el manifestUrl oficial para la validación de la wallet.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TonConnectUIProvider
      manifestUrl="https://pee-crypto-market.vercel.app/tonconnect-manifest.json"
    >
      {children}
    </TonConnectUIProvider>
  );
}
