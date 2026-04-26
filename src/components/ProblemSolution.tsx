
"use client";

import Image from 'next/image';
import { Globe, ShoppingBag, Smartphone, Cpu } from 'lucide-react';
import { Language } from '@/app/page';

interface ProblemSolutionProps {
  lang: Language;
}

export function ProblemSolution({ lang }: ProblemSolutionProps) {
  const t = {
    es: {
      tag: "Infraestructura Híbrida",
      title: "Donde la Tecnología se encuentra con el Consumo Diario",
      desc: "PEE Crypto Market no es solo un supermercado; es un protocolo de retail descentralizado. La imagen que ves refleja nuestra aplicación móvil integrada con pagos cripto y logística propia.",
      quote: "Estamos fusionando la infraestructura del retail tradicional con la eficiencia de la Red TON."
    },
    en: {
      tag: "Hybrid Infrastructure",
      title: "Where Technology Meets Daily Consumption",
      desc: "PEE Crypto Market is not just a supermarket; it's a decentralized retail protocol. The image you see reflects our mobile application integrated with crypto payments and own logistics.",
      quote: "We are merging traditional retail infrastructure with TON Network efficiency."
    }
  }[lang];

  const features = [
    {
      icon: <Globe className="h-6 w-6" />,
      title: lang === 'es' ? "Integración Masiva" : "Massive Integration",
      desc: lang === 'es' ? "Acceso directo a los 900 millones de usuarios de Telegram." : "Direct access to 900 million Telegram users."
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: lang === 'es' ? "Tecnología TVM" : "TVM Technology",
      desc: lang === 'es' ? "Smart contracts avanzados para la gestión de inventario y pagos." : "Advanced smart contracts for inventory and payments management."
    },
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: lang === 'es' ? "Retail del Futuro" : "Retail of the Future",
      desc: lang === 'es' ? "Un negocio físico escalado mediante gemelos digitales y blockchain." : "Physical business scaled through digital twins and blockchain."
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: lang === 'es' ? "Experiencia Mobile-First" : "Mobile-First Experience",
      desc: lang === 'es' ? "Tu supermercado vive en tu bolsillo, sin intermediarios." : "Your supermarket lives in your pocket, no intermediaries."
    }
  ];

  return (
    <section id="problem" className="py-24 overflow-hidden bg-white/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative flex justify-center order-2 md:order-1">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-secondary/30 rounded-full blur-[120px]" />
            <div className="relative z-10 w-full max-w-lg">
              <div className="rounded-3xl overflow-hidden border-4 border-white shadow-[0_0_50px_rgba(60,194,221,0.3)] bg-white aspect-square relative flex items-center justify-center">
                <Image 
                  src="/propuesta-tecnologica.png" 
                  alt="PEE Shopping Retail Integration" 
                  width={600}
                  height={600}
                  className="object-contain p-4 w-full h-full" 
                  priority
                  unoptimized
                />
              </div>
              <div className="absolute -bottom-6 -left-6 p-6 bg-primary text-primary-foreground rounded-2xl shadow-2xl max-w-xs hidden sm:block border border-white/10">
                <p className="text-sm font-headline font-medium leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs mb-6 border border-primary/20 uppercase tracking-widest">
              {t.tag}
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-6 leading-tight">
              {t.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
              {t.desc}
            </p>
            
            <div className="grid sm:grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col gap-3 group">
                  <div className="w-12 h-12 shrink-0 bg-white border rounded-xl flex items-center justify-center text-secondary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-headline font-semibold text-primary mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-snug">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
