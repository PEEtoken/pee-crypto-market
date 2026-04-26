import { CheckCircle2, Circle } from 'lucide-react';

export function Roadmap() {
  const phases = [
    {
      title: "Fase 1 - Comunidad",
      status: "En Progreso",
      active: true,
      desc: "Consolidación de los primeros 1.000 fundadores y registro legal en Europa (Estonia, Lituania, Suiza, Polonia o Portugal)."
    },
    {
      title: "Fase 2 - Mercado Digital",
      status: "Próximamente",
      active: false,
      desc: "Lanzamiento de la tienda virtual con pagos en cripto y logística propia integrada a Telegram."
    },
    {
      title: "Fase 3 - Supermercado Piloto",
      status: "Futuro",
      active: false,
      desc: "Apertura del primer local físico integrando TVM (TON Virtual Machine) para cobros automatizados."
    }
  ];

  return (
    <section id="roadmap" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-headline font-bold text-primary mb-6">Hoja de Ruta: 24 meses</h2>
          <p className="text-lg text-muted-foreground italic">
            "El supermercado del futuro no lo construye un banco, lo construyes tú"
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline bar */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-primary/10 -translate-x-1/2" />
          
          <div className="space-y-24">
            {phases.map((phase, i) => (
              <div key={i} className={`relative flex flex-col md:flex-row items-center gap-8 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                {/* Connector point */}
                <div className="absolute left-4 md:left-1/2 top-0 -translate-x-1/2 w-8 h-8 rounded-full border-4 border-background bg-white z-10 flex items-center justify-center">
                  {phase.active ? (
                    <CheckCircle2 className="h-full w-full text-secondary" />
                  ) : (
                    <Circle className="h-5 w-5 text-primary/20" />
                  )}
                </div>
                
                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${i % 2 !== 0 ? 'md:text-left' : 'md:text-right'}`}>
                  <div className={`p-8 rounded-3xl bg-white shadow-sm border ${phase.active ? 'border-secondary/30 ring-4 ring-secondary/5' : ''}`}>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 ${phase.active ? 'bg-secondary/10 text-secondary' : 'bg-muted text-muted-foreground'}`}>
                      {phase.status}
                    </div>
                    <h3 className="text-2xl font-headline font-bold text-primary mb-4">{phase.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{phase.desc}</p>
                  </div>
                </div>
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}