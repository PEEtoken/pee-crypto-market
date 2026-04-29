"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, ShieldCheck, Database, Loader2, MessageCircle, Link as LinkIcon } from 'lucide-react';
import { Language } from '@/app/page';

interface CounterProps {
  lang: Language;
}

export function Counter({ lang }: CounterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  
  const GOAL = 1000;
  const TELEGRAM_LINK = "https://t.me/+chwJbbIptpdhNDc8";

  const t = {
    es: {
      wallets: "Carteras de Fundador",
      live: "Blockchain en vivo (TON)",
      multisig: "Seguridad Multifirma",
      transparency: "Transparencia Radical",
      contracts: "Smart Contracts",
      infra: "Infraestructura Híbrida",
      validate: "Validar mi Estatus en Telegram",
      disclaimer: "Identifícate con tu TXID para asegurar tu lugar inmutable.",
      verifying: "Verificando Bloque Génesis..."
    },
    en: {
      wallets: "Founding Wallets",
      live: "Live Blockchain (TON)",
      multisig: "Multisig Security",
      transparency: "Radical Transparency",
      contracts: "Smart Contracts",
      infra: "Hybrid Infrastructure",
      validate: "Validate my Status on Telegram",
      disclaimer: "Identify yourself with your TXID to secure your immutable place.",
      verifying: "Verifying Genesis Block..."
    }
  }[lang];

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await fetch(
          "https://tonapi.io/v2/blockchain/accounts/EQDyaPfKJD5Om5Nx9-3uOT7SKiOkiLG_4rkOLO3BZqYEGMO7/transactions"
        );

        const data = await res.json();

        const txs = data.transactions || [];

        const incoming = txs.filter(
          (tx: any) => tx.in_msg && tx.in_msg.destination?.address
        );

        setCount(incoming.length);

      } catch (error) {
        console.error("Error fetching TON data:", error);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();

    const interval = setInterval(fetchCount, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-16 bg-white border-y">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          <Card className="border-none shadow-none bg-transparent">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center mb-4 text-primary relative">
                <Users className="h-6 w-6" />
                {loading && (
                  <div className="absolute -top-1 -right-1">
                    <Loader2 className="h-4 w-4 animate-spin text-secondary" />
                  </div>
                )}
              </div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-headline font-bold text-primary">
                  {count ?? 0}
                </span>
                <span className="text-xl font-headline font-medium text-muted-foreground">/ {GOAL}</span>
              </div>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">{t.wallets}</p>
              <div className="mt-2 flex items-center gap-1.5 px-2 py-0.5 bg-secondary/10 rounded-full">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
                <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">
                  {t.live}
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-none shadow-none bg-transparent hidden md:block">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4 text-secondary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="text-4xl font-headline font-bold text-primary mb-1">6 / 4</div>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">{t.multisig}</p>
              <div className="mt-2 text-[10px] text-secondary font-bold uppercase tracking-widest">
                {t.transparency}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-none bg-transparent hidden md:block">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4 text-accent">
                <Database className="h-6 w-6" />
              </div>
              <div className="text-4xl font-headline font-bold text-primary mb-1">TVM</div>
              <p className="text-muted-foreground text-xs font-bold uppercase tracking-wider">{t.contracts}</p>
              <div className="mt-2 text-[10px] text-secondary font-bold uppercase tracking-widest">
                {t.infra}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Button 
            asChild
            variant="outline"
            className="border-secondary text-primary hover:bg-secondary/5 h-12 px-6 md:px-8 rounded-full font-bold group w-full sm:w-auto shadow-sm"
          >
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
              {t.validate}
            </a>
          </Button>
          <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground text-center max-w-md">
            <LinkIcon className="h-3 w-3" />
            <p>{t.disclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}