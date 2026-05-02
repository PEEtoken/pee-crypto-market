"use client";

import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, Wallet, Send, CheckCircle2, MessageCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { aiWalletActivationGuide, WalletActivationOutput, WalletActivationInput } from '@/ai/flows/ai-wallet-activation-guide';
import { Language } from '@/app/page';
import { useToast } from '@/hooks/use-toast';
import { 
  useTonConnectUI, 
  useTonAddress, 
  useIsConnectionRestored, 
  useTonConnectModal,
  useTonWallet
} from '@tonconnect/ui-react';

interface WalletActivationDialogProps {
  lang: Language;
}

/**
 * @fileOverview Dialogo de activación que maneja la lógica de transacción con TON Connect.
 */
export function WalletActivationDialog({ lang }: WalletActivationDialogProps) {
  const [mounted, setMounted] = useState(false);
  const isConnectionRestored = useIsConnectionRestored();
  
  const [tonConnectUI] = useTonConnectUI();
  const { open: openModal } = useTonConnectModal();
  const wallet = useTonWallet();
  const userAddress = useTonAddress();
  const { toast } = useToast();

  const [step, setStep] = useState<WalletActivationInput['currentStep']>('initial');
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState<WalletActivationOutput | null>(null);
  
  // Configuración de transacción corregida
  const DESTINATION_WALLET = "EQDyaPfKJD5Om5Nx9-3uOT7SKiOkiLG_4rkOLO3BZqYEGMO7";
  const AMOUNT_NANOTONS = "100000000"; // 0.1 TON para pruebas (debe ser string)
  const TELEGRAM_COMMUNITY_LINK = "https://t.me/+chwJbbIptpdhNDc8";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && userAddress && isConnectionRestored && step === 'initial') {
      setStep('walletConnected');
      fetchGuidance('walletConnected', userAddress);
    }
  }, [userAddress, step, mounted, isConnectionRestored]);

  const t = {
    es: {
      btn: "Activar mi Wallet de Fundador - 1 USDT",
      btnConnected: "Confirmar Aporte de Fundador",
      title: "Activación de Fundador",
      consulting: "Consultando al guía de la Red TON...",
      sent: "¡Aportación enviada! Entra a la comunidad para asegurar tu registro.",
      communityBtn: "Entrar a la Comunidad",
      communityDesc: "Paso obligatorio para registrar tu wallet (Anexo A).",
      connect: "Vincular Wallet TON",
      pay: "Enviar Aporte",
      errorTitle: "Error en la Transacción",
      errorDesc: "La transacción fue rechazada o el payload es inválido.",
      successTitle: "¡Transacción Enviada!",
      successDesc: "Tu aporte está siendo procesado por la Red TON. ¡Bienvenido!",
      restoring: "Sincronizando sesión..."
    },
    en: {
      btn: "Activate my Founding Wallet - 1 USDT",
      btnConnected: "Confirm Founder Contribution",
      title: "Founder Activation",
      consulting: "Consulting the TON Network guide...",
      sent: "Contribution sent! Join the community to secure your registration.",
      communityBtn: "Join the Community",
      communityDesc: "Mandatory step to register your wallet (Annex A).",
      connect: "Link TON Wallet",
      pay: "Send Contribution",
      errorTitle: "Transaction Error",
      errorDesc: "The transaction was rejected or the payload is invalid.",
      successTitle: "Transaction Sent!",
      successDesc: "Your contribution is being processed by the TON Network. Welcome!",
      restoring: "Syncing session..."
    }
  }[lang];

  const fetchGuidance = async (currentStep: WalletActivationInput['currentStep'], walletAddr?: string) => {
    if (!mounted) return;
    setLoading(true);
    try {
      const result = await aiWalletActivationGuide({
        currentStep,
        walletAddress: walletAddr || userAddress,
        usdtAmount: 1,
        language: lang
      });
      if (result) setGuide(result);
    } catch (err) {
      console.error('AI Guidance error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!mounted || !isConnectionRestored) return;
    
    if (!wallet) {
      openModal();
      return;
    }

    // Estructura de transacción corregida para evitar [TON_CONNECT_SDK_ERROR] Payload is invalid
    const transaction = {
      validUntil: Math.floor(Date.now() / 1000) + 300, // 5 minutos de validez
      messages: [
        {
          address: DESTINATION_WALLET,
          amount: AMOUNT_NANOTONS, // Valor en nanotons como string
        }
      ]
    };

    try {
      setStep('usdtSent');
      const result = await tonConnectUI.sendTransaction(transaction);
      
      if (result) {
        setStep('confirmed');
        fetchGuidance('confirmed');
        toast({
          title: t.successTitle,
          description: t.successDesc,
        });
      }
    } catch (e) {
      console.error("TON Connect Transaction Error:", e);
      setStep('walletConnected');
      toast({
        variant: "destructive",
        title: t.errorTitle,
        description: t.errorDesc,
      });
    }
  };

  const handleDirectPay = () => {
    window.open(
      "https://app.tonkeeper.com/transfer/EQDyaPfKJD5Om5Nx9-3uOT7SKiOkiLG_4rkOLO3BZqYEGMO7?amount=100000000",
      "_blank"
    );
  };

  const getStepIcon = () => {
    if (!mounted || !isConnectionRestored) return <Loader2 className="h-10 w-10 animate-spin text-primary/30" />;
    switch (step) {
      case 'initial': return <Wallet className="h-10 w-10 text-primary" />;
      case 'walletConnected': return <Send className="h-10 w-10 text-secondary" />;
      case 'usdtSent': return <Loader2 className="h-10 w-10 animate-spin text-accent" />;
      case 'confirmed': return <CheckCircle2 className="h-10 w-10 text-green-500" />;
      case 'error': return <AlertCircle className="h-10 w-10 text-destructive" />;
      default: return <Wallet className="h-10 w-10 text-primary" />;
    }
  };

  if (!mounted || !isConnectionRestored) return (
    <Button size="lg" disabled className="bg-primary/50 text-primary-foreground px-6 md:px-8 py-6 rounded-full w-full sm:w-auto">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {t.restoring}
    </Button>
  );

  return (
    <Dialog onOpenChange={(open) => open && step === 'initial' && fetchGuidance('initial')}>
      <DialogTrigger asChild>
        <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 md:px-8 py-6 text-sm md:text-lg font-bold shadow-xl rounded-full transition-all hover:scale-105 w-full sm:w-auto">
          {wallet ? t.btnConnected : t.btn}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-center font-headline text-2xl text-primary">{t.title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-6 text-center">
          <div className="mb-6 p-4 bg-muted/50 rounded-full relative">
            {getStepIcon()}
          </div>
          
          {loading ? (
            <p className="text-muted-foreground animate-pulse text-sm">{t.consulting}</p>
          ) : (
            guide && (
              <div className="space-y-6 w-full">
                <div className="bg-white/50 p-4 rounded-2xl border border-primary/5">
                  <p className="text-foreground text-sm leading-relaxed font-medium">
                    {step === 'confirmed' ? t.sent : guide.guidanceMessage}
                  </p>
                </div>

                {step === 'confirmed' ? (
                  <div className="space-y-4">
                    <Button asChild className="w-full bg-secondary text-primary h-14 rounded-xl text-lg font-bold shadow-lg">
                      <a href={TELEGRAM_COMMUNITY_LINK} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5 fill-current" />
                        {t.communityBtn}
                      </a>
                    </Button>
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">{t.communityDesc}</p>
                  </div>
                ) : (
                  <div className="pt-4">
                    <Button 
                      disabled={step === 'usdtSent'}
                      onClick={handleAction} 
                      className="w-full bg-secondary text-primary h-14 rounded-xl text-lg font-bold flex items-center justify-center gap-2 group"
                    >
                      {step === 'usdtSent' ? (
                        <Loader2 className="animate-spin" />
                      ) : !wallet ? (
                        <Wallet className="h-5 w-5" />
                      ) : (
                        <ExternalLink className="h-5 w-5" />
                      )}
                      {!wallet ? t.connect : t.pay}
                    </Button>
                    <Button
                      onClick={handleDirectPay}
                      variant="outline"
                      className="w-full mt-3 border-primary text-primary"
                    >
                      Pagar directo (Multisig)
                    </Button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
        
        <div className="text-[9px] text-center text-muted-foreground/60 px-4 break-all mt-4 border-t pt-4">
          Wallet Oficial (Multisig): {DESTINATION_WALLET}
        </div>
      </DialogContent>
    </Dialog>
  );
}