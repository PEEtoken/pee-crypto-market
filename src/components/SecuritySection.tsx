import { Card, CardContent } from '@/components/ui/card';
import { Shield, Eye, Lock } from 'lucide-react';

export function SecuritySection() {
  return (
    <section id="security" className="py-24 bg-primary text-primary-foreground overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-secondary/5 -skew-x-12 transform translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mb-16">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6">Tu confianza, ciega por la tecnología</h2>
          <p className="text-xl text-primary-foreground/80 leading-relaxed">
            Tu aportación no la controla una persona, la controla la comunidad. Usamos una billetera multifirma (6/4) en la red TON, lo que significa que cualquier movimiento requiere aprobación colectiva.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Lock className="h-8 w-8" />,
              title: "Multifirma 6/4",
              desc: "Arquitectura de seguridad donde 4 de 6 guardianes deben autorizar cualquier flujo de capital."
            },
            {
              icon: <Eye className="h-8 w-8" />,
              title: "Inmutabilidad Total",
              desc: "Tu registro como fundador se sube a la blockchain TON y se anexa legalmente en nuestros estatutos."
            },
            {
              icon: <Shield className="h-8 w-8" />,
              title: "Transparencia Radical",
              desc: "Cualquier usuario puede verificar el balance y movimientos de la wallet oficial en el explorador de TON."
            }
          ].map((item, i) => (
            <Card key={i} className="bg-white/10 border-white/20 text-white backdrop-blur-sm hover:bg-white/20 transition-colors">
              <CardContent className="p-8">
                <div className="mb-4 text-secondary">{item.icon}</div>
                <h3 className="text-2xl font-headline font-bold mb-3">{item.title}</h3>
                <p className="text-white/70 leading-relaxed">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 p-6 rounded-2xl bg-secondary/20 border border-secondary/30 text-center">
          <p className="font-mono text-sm break-all opacity-80">
            Wallet Oficial: EQDyaPfKJD5Om5Nx9-3uOT7SKiOkiLG_4rkOLO3BZqYEGMO7
          </p>
        </div>
      </div>
    </section>
  );
}