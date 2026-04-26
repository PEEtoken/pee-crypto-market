
"use client";

import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { Counter } from '@/components/Counter';
import { ProblemSolution } from '@/components/ProblemSolution';
import { SecuritySection } from '@/components/SecuritySection';
import { TokenUtility } from '@/components/TokenUtility';
import { Roadmap } from '@/components/Roadmap';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { Toaster } from '@/components/ui/toaster';

export type Language = 'es' | 'en';

export default function Home() {
  const [lang, setLang] = useState<Language>('es');

  const toggleLang = () => setLang(prev => prev === 'es' ? 'en' : 'es');

  return (
    <main className="min-h-screen bg-background">
      <Navigation lang={lang} toggleLang={toggleLang} />
      <Hero lang={lang} />
      <Counter lang={lang} />
      <ProblemSolution lang={lang} />
      <SecuritySection />
      <TokenUtility />
      <Roadmap />
      <FAQ />
      <Footer />
      <Toaster />
    </main>
  );
}
