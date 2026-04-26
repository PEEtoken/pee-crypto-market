import { Card, CardContent } from '@/components/ui/card';
import { TicketPercent, Trophy, MessageSquareQuote, Coins } from 'lucide-react';

export function TokenUtility() {
  const utilities = [
    {
      icon: <TicketPercent className="h-6 w-6" />,
      title: "Descuentos Exclusivos",
      desc: "Beneficios directos en compras físicas y digitales dentro de nuestra red."
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Programas de Fidelidad",
      desc: "Recompensas por uso frecuente y participación activa en el ecosistema."
    },
    {
      icon: <MessageSquareQuote className="h-6 w-6" />,
      title: "Gobernanza",
      desc: "Voz y voto en las decisiones estratégicas y locales del supermercado."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-semibold text-xs mb-4 border border-secondary/20">
            EL CORAZÓN DEL ECOSISTEMA
          </div>
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-6">Utilidad del Token PEE</h2>
          <p className="text-lg text-muted-foreground">
            Con un suministro total de <strong>1.000.000.000</strong>, este utilitario token te otorga beneficios reales en el mundo tangible.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {utilities.map((item, i) => (
            <div key={i} className="p-8 rounded-2xl border bg-background/50 hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 border border-primary/10">
                {item.icon}
              </div>
              <h3 className="text-2xl font-headline font-bold text-primary mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="inline-flex items-center gap-4 p-4 px-8 rounded-full bg-primary text-primary-foreground shadow-lg">
            <Coins className="h-5 w-5 text-secondary" />
            <span className="font-headline font-bold">1,000,000,000 Total Supply</span>
          </div>
        </div>
      </div>
    </section>
  );
}