
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
import { Loader2, Wallet, Send, CheckCircle2, MessageCircle, ExternalLink, AlertCircle, ShieldCheck, History } from 'lucide-react';
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

// Constantes de Direcciones
const DESTINATION_MULTISIG_WALLET = "EQDyaPfKJD5Om5Nx9-3uOT7SKiOkiLG_4rkOLO3BZqYEGMO7";
const DESTINATION_BACKUP_WALLET = "UQCx6O7-7_Cdp6tgZI21h3EBbOAU0lOFQS4z_CHRyy-oOn0i";
const TELEGRAM_COMMUNITY_LINK = "https://t.me/+chwJbbIptpdhNDc8";

/**
 * @fileOverview Dialogo de activación que maneja múltiples opciones de pago con TON Connect.
 * Incluye opción a Multisig, Backup y Deep Link.
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
      payMultisig: "Pagar directo a la multifirma",
      payBackup: "Pagar a wallet de respaldo",
      payTonkeeper: "Pagar con Tonkeeper",
      transparencyText: "Transparencia: el pago directo intenta ir a la multifirma. Si tu wallet no lo soporta, puedes usar la wallet de respaldo; luego los fondos serán transferidos a la multifirma.",
      infoText: "Tu aporte se procesa de forma segura y posteriormente se transfiere a la wallet multifirma del proyecto para garantizar transparencia.",
      errorTitle: "Error en la Transacción",
      errorDesc: "La transacción fue rechazada o el precio no pudo ser calculado.",
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
      payMultisig: "Pay directly to multisig",
      payBackup: "Pay to backup wallet",
      payTonkeeper: "Pay with Tonkeeper",
      transparencyText: "Transparency: Direct payment attempts to go to the multisig. If your wallet doesn't support it, you can use the backup wallet; funds will then be transferred to the multisig.",
      infoText: "Your contribution is processed securely and later transferred to the project's multisig wallet to ensure transparency.",
      errorTitle: "Transaction Error",
      errorDesc: "The transaction was rejected or price could not be calculated.",
      successTitle: "Transaction Sent!",
      successDesc: "Your contribution is being processed by the TON Network. Welcome!",
      restoring: "Syncing session..."
    }
  }[lang];

  const getTonPrice = async (): Promise<number> => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd');
      const data = await response.json();
      return data['the-open-network'].usd;
    } catch (error) {
      console.error('Error fetching TON price:', error);
      return 5.5; 
    }
  };

  const calculateAmount = (usdAmount: number, tonPrice: number): string => {
    const tonAmount = usdAmount / tonPrice;
    const nanoTons = Math.floor(tonAmount * 1e9);
    return nanoTons.toString();
  };

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

  // Función genérica para enviar transacción vía TON Connect
  const sendTonTransaction = async (targetAddress: string) => {
    if (!mounted || !isConnectionRestored || !wallet) return;

    try {
      setStep('usdtSent');
      const tonPrice = await getTonPrice();
      const dynamicAmount = calculateAmount(1, tonPrice);

      const transaction = {
        validUntil: Math.floor(Date.now() / 1000) + 600,
        messages: [
          {
            address: targetAddress,
            amount: dynamicAmount,
          }
        ]
      };

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

  const handlePayToMultisig = () => sendTonTransaction(DESTINATION_MULTISIG_WALLET);
  const handlePayToBackupWallet = () => sendTonTransaction(DESTINATION_BACKUP_WALLET);

  const handleTonkeeperDirect = () => {
    const amount = "100000000"; // 0.1 TON aprox para pruebas o valor fijo
    const url = `ton://transfer/${DESTINATION_MULTISIG_WALLET}?amount=${amount}`;
    window.location.href = url;
    setTimeout(() => {
      window.open(
        `https://app.tonkeeper.com/transfer/${DESTINATION_MULTISIG_WALLET}?amount=${amount}`,
        "_blank"
      );
    }, 1500);
  };

  const getStepIcon = () => {
    if (!mounted || !isConnectionRestored) return <Loader2 className="h-10 w-10 animate-spin text-primary/30" />;
    switch (step) {
      case 'initial': return <Wallet className="h-10 w-10 text-primary" />;
      case 'walletConnected': return <ShieldCheck className="h-10 w-10 text-secondary" />;
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
        
        <div className="flex flex-col items-center py-4 text-center">
          <div className="mb-4 p-4 bg-muted/50 rounded-full relative">
            {getStepIcon()}
          </div>
          
          {loading ? (
            <p className="text-muted-foreground animate-pulse text-sm">{t.consulting}</p>
          ) : (
            guide && (
              <div className="space-y-4 w-full">
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
                  <div className="space-y-3">
                    <p className="text-[11px] text-muted-foreground bg-primary/5 p-3 rounded-xl border border-primary/10 leading-snug">
                      {t.transparencyText}
                    </p>
                    
                    <div className="grid gap-3 pt-2">
                      {!wallet ? (
                        <Button 
                          onClick={openModal} 
                          className="w-full bg-primary text-primary-foreground h-14 rounded-xl text-lg font-bold flex items-center justify-center gap-2"
                        >
                          <Wallet className="h-5 w-5" />
                          {t.connect}
                        </Button>
                      ) : (
                        <>
                          <Button 
                            disabled={step === 'usdtSent'}
                            onClick={handlePayToMultisig} 
                            className="w-full bg-primary text-primary-foreground h-14 rounded-xl text-lg font-bold flex items-center justify-center gap-2"
                          >
                            <ShieldCheck className="h-5 w-5 text-secondary" />
                            {t.payMultisig}
                          </Button>

                          <Button 
                            disabled={step === 'usdtSent'}
                            onClick={handlePayToBackupWallet} 
                            variant="secondary"
                            className="w-full h-14 rounded-xl text-lg font-bold flex items-center justify-center gap-2 border-primary/10 border"
                          >
                            <History className="h-5 w-5" />
                            {t.payBackup}
                          </Button>
                        </>
                      )}

                      <Button
                        onClick={handleTonkeeperDirect}
                        variant="outline"
                        className="w-full h-14 border-primary text-primary rounded-xl text-lg font-bold"
                      >
                        {t.payTonkeeper}
                      </Button>
                    </div>

                    <p className="text-[10px] text-muted-foreground mt-4 italic">
                      {t.infoText}
                    </p>
                  </div>
                )}
              </div>
            )
          )}
        </div>
        
        <div className="text-[9px] text-center text-muted-foreground/60 px-4 break-all mt-2 border-t pt-4">
          Wallet Oficial (Multisig): {DESTINATION_MULTISIG_WALLET}
        </div>
      </DialogContent>
    </Dialog>
  );
}
