
import { ShoppingBasket, Send, MessageCircle } from 'lucide-react';
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
        
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-sm text-primary-foreground/40">
            © {new Date().getFullYear()} PEE Crypto Market. Todos los derechos reservados.
          </div>
          <div className="text-xs text-primary-foreground/40 text-center md:text-right max-w-lg leading-tight">
            Token PEE es un token de utilidad. No representa acciones legales. Invertir en criptoactivos conlleva riesgos.
          </div>
        </div>
      </div>
    </footer>
  );
}
