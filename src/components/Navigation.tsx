
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Languages, Loader2 } from 'lucide-react';
import { Language } from '@/app/page';
import { TonConnectButton, useIsConnectionRestored } from '@tonconnect/ui-react';

interface NavigationProps {
  lang: Language;
  toggleLang: () => void;
}

export function Navigation({ lang, toggleLang }: NavigationProps) {
  const [mounted, setMounted] = useState(false);
  const isConnectionRestored = useIsConnectionRestored();

  useEffect(() => {
    setMounted(true);
  }, []);

  const t = {
    es: { proposal: "Propuesta", security: "Seguridad", roadmap: "Roadmap", faq: "FAQ" },
    en: { proposal: "Proposal", security: "Security", roadmap: "Roadmap", faq: "FAQ" }
  }[lang];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg border bg-white flex items-center justify-center transition-transform group-hover:scale-105">
            <Image 
              src="/logo-principal.jpg" 
              alt="PEE Market Logo" 
              width={40}
              height={40}
              className="object-contain"
              priority
              unoptimized
            />
          </div>
          <span className="font-headline font-bold text-lg md:text-xl tracking-tight text-primary">PEE MARKET</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="#problem" className="hover:text-secondary transition-colors">{t.proposal}</Link>
          <Link href="#security" className="hover:text-secondary transition-colors">{t.security}</Link>
          <Link href="#roadmap" className="hover:text-secondary transition-colors">{t.roadmap}</Link>
          <Link href="#faq" className="hover:text-secondary transition-colors">{t.faq}</Link>
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="sm" onClick={toggleLang} className="flex items-center gap-1 font-bold text-primary">
            <Languages className="h-4 w-4" />
            <span className="uppercase">{lang}</span>
          </Button>
          <div className="ton-button-wrapper min-w-[140px] flex justify-end">
            {!mounted || !isConnectionRestored ? (
              <div className="h-10 w-[140px] bg-muted rounded-xl flex items-center justify-center">
                <Loader2 className="h-4 w-4 animate-spin text-primary/30" />
              </div>
            ) : (
              <TonConnectButton />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
