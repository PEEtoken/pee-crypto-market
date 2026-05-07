import { ShoppingBasket, MessageCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const TELEGRAM_LINK = "https://t.me/+chwJbbIptpdhNDc8";

  return (
    <footer className="bg-primary text-primary-foreground py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingBasket className="h-8 w-8 text-secondary" />
              <span className="font-headline font-bold text-2xl tracking-tighter">PEE MARKET</span>
            </div>
            <p className="text-primary-foreground/70 max-w-sm mb-8 leading-relaxed">
              El primer supermercado comunitario del mundo impulsado por la red TON. Únete a la revolución del retail descentralizado y asegura tu ID de Fundador.
            </p>
            <div className="space-y-4">
              <Button asChild className="bg-secondary hover:bg-secondary/90 text-primary font-bold rounded-full px-8 py-6 h-auto shadow-lg">
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-6 w-6 fill-current" />
                  Entrar a la Comunidad de Fundadores
                </a>
              </Button>
              <p className="text-[10px] text-primary-foreground/40 font-medium uppercase tracking-wider pl-4">
                Paso obligatorio para registro en estatutos legales
              </p>
            </div>
          </div>
          
          <div>
            <h4 className="font-headline font-bold text-lg mb-6 text-secondary">Navegación</h4>
            <ul className="space-y-4 text-primary-foreground/60">
              <li><a href="#problem" className="hover:text-white transition-colors">Propuesta</a></li>
              <li><a href="#security" className="hover:text-white transition-colors">Seguridad</a></li>
              <li><a href="#roadmap" className="hover:text-white transition-colors">Roadmap</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-headline font-bold text-lg mb-6 text-secondary">Comunidad</h4>
            <ul className="space-y-4 text-primary-foreground/60">
              <li><a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Telegram Oficial</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Medium Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10">
            <div className="text-sm text-primary-foreground/40 font-medium">
              © {new Date().getFullYear()} PEE Crypto Market. Todos los derechos reservados.
            </div>
            <div className="flex gap-6 text-[10px] text-primary-foreground/40 font-bold uppercase tracking-widest">
              <a href="#" className="hover:text-secondary transition-colors">Términos</a>
              <a href="#" className="hover:text-secondary transition-colors">Privacidad</a>
              <a href="#" className="hover:text-secondary transition-colors">Disclaimer</a>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center border-t border-white/5 pt-8">
            <div className="flex justify-center mb-4 text-secondary/30">
               <ShieldCheck className="h-6 w-6" />
            </div>
            <div className="text-[10px] md:text-xs text-primary-foreground/40 leading-relaxed space-y-4">
              <p>
                PEE Crypto Market es un ecosistema digital en fase inicial orientado al desarrollo de soluciones Web3, comunidad y tecnología blockchain. El Token PEE es un token de utilidad dentro del ecosistema y no representa acciones, valores financieros, participación societaria ni derechos legales sobre una entidad.
              </p>
              <p>
                La participación dentro de la plataforma y los aportes realizados son voluntarios y no constituyen una inversión financiera ni garantizan rendimientos económicos futuros.
              </p>
              <p>
                Los criptoactivos y tecnologías blockchain implican riesgos tecnológicos, regulatorios y de mercado. Cada usuario es responsable de realizar su propia evaluación antes de participar.
              </p>
              <p>
                PEE Crypto Market no proporciona asesoría financiera, legal o de inversión.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
