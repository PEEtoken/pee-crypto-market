
"use client";

import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { WalletActivationDialog } from './WalletActivationDialog';
import { Cpu } from 'lucide-react';
import { Language } from '@/app/page';

interface HeroProps {
  lang: Language;
}

export function Hero({ lang }: HeroProps) {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

  const t = {
    es: {
      tag: "Tecnología Red TON",
      title: "El Retail ha evolucionado.",
      titleAccent: "Sé el Dueño.",
      desc: "Fusionamos la logística del retail masivo con la transparencia del Bloque Génesis. Registra tu wallet como Fundador Comunitario.",
      contribution: "Aportación Única",
      powered: "Impulsado por",
      trustless: "Seguridad"
    },
    en: {
      tag: "TON Network Tech",
      title: "Retail has evolved.",
      titleAccent: "Be the Owner.",
      desc: "We merge mass retail logistics with Genesis Block transparency. Register your wallet as a Community Founder.",
      contribution: "Single Contribution",
      powered: "Powered by",
      trustless: "Security"
    }
  }[lang];

  return (
    <section className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        {heroImage?.imageUrl && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover opacity-30 scale-105"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background to-background" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl text-center md:text-left mx-auto md:mx-0">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary font-bold text-xs md:text-sm mb-8 border border-primary/10 shadow-sm mx-auto md:mx-0">
            <Cpu className="h-4 w-4 text-secondary" />
            <span className="uppercase tracking-[0.2em]">{t.tag}</span>
          </div>
          
          <h1 className="font-headline text-4xl md:text-8xl font-bold text-primary mb-8 leading-[1.1] tracking-tight">
            {t.title} <br />
            <span className="text-secondary">{t.titleAccent}</span>
          </h1>
          
          <p className="font-body text-lg md:text-2xl text-muted-foreground mb-10 max-w-2xl leading-relaxed mx-auto md:mx-0">
            {t.desc}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-6">
            <WalletActivationDialog lang={lang} />
            <div className="flex flex-col text-center md:text-left">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">{t.contribution}</span>
              <span className="text-2xl font-headline font-bold text-secondary">1.00 USDT</span>
            </div>
          </div>
          
          <div className="mt-16 flex items-center justify-center md:justify-start gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 overflow-x-auto pb-4">
            <div className="flex flex-col shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-tighter">{t.powered}</span>
              <span className="text-lg font-headline font-extrabold">TON NETWORK</span>
            </div>
            <div className="w-px h-10 bg-primary/10 shrink-0" />
            <div className="flex flex-col shrink-0">
              <span className="text-[10px] font-bold uppercase tracking-tighter">{t.trustless}</span>
              <span className="text-lg font-headline font-extrabold">MULTISIG 6/4</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-secondary/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
    </section>
  );
}
