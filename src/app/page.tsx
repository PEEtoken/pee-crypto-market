
"use client";

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Counter } from '@/components/Counter';
import { ProblemSolution } from '@/components/ProblemSolution';
import { Roadmap } from '@/components/Roadmap';
import { TokenUtility } from '@/components/TokenUtility';
import { SecuritySection } from '@/components/SecuritySection';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";

export type Language = 'es' | 'en';

/**
 * @fileOverview Página principal que restaura el diseño completo de PEE Crypto Market.
 */
export default function Home() {
  const [lang, setLang] = useState<Language>('es');

  const toggleLang = () => {
    setLang(prev => prev === 'es' ? 'en' : 'es');
  };

  return (
    <main className="min-h-screen bg-background">
      <Navigation lang={lang} toggleLang={toggleLang} />
      <Hero lang={lang} />
      <Counter lang={lang} />
      <ProblemSolution lang={lang} />
      <Roadmap />
      <TokenUtility />
      <SecuritySection />
      <FAQ />
      <Footer />
      <Toaster />
    </main>
  );
}
