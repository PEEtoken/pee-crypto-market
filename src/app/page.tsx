
"use client";

import { TonConnectButton } from "@tonconnect/ui-react";
import Image from "next/image";

/**
 * @fileOverview Página principal simplificada para validación de conexión TON.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 bg-white p-8 rounded-3xl shadow-xl border border-primary/5">
        <div className="flex justify-center">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-primary/10 bg-white">
            <Image 
              src="/logo-principal.jpg" 
              alt="PEE Market Logo" 
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-headline font-bold text-primary">PEE Crypto Market</h1>
          <p className="text-muted-foreground font-medium">Conecta tu wallet para comenzar</p>
        </div>

        <div className="flex justify-center py-4">
          <TonConnectButton />
        </div>

        <div className="pt-6 border-t border-dashed">
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
            Blockchain Network: TON
          </p>
        </div>
      </div>
      
      {/* Sección de Propuesta Visual */}
      <div className="mt-12 max-w-lg">
        <div className="rounded-2xl overflow-hidden shadow-2xl bg-white border">
          <Image 
            src="/propuesta-tecnologica.png" 
            alt="Propuesta PEE" 
            width={600} 
            height={400} 
            className="w-full h-auto"
            unoptimized
          />
        </div>
        <p className="mt-4 text-center text-sm text-muted-foreground italic">
          "Estamos fusionando la infraestructura del retail tradicional con la eficiencia de la Red TON."
        </p>
      </div>
    </main>
  );
}
