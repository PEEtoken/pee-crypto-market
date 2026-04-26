'use server';
/**
 * @fileOverview An AI agent that guides users through the founder wallet activation process in both Spanish and English.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const WalletActivationInputSchema = z.object({
  walletAddress: z.string().optional().describe('The user\'s TON wallet address.'),
  usdtAmount: z.number().optional().describe('The amount of USDT contributed.'),
  currentStep: z.enum(['initial', 'walletConnected', 'usdtSent', 'confirmed', 'error']).default('initial'),
  transactionHash: z.string().optional(),
  errorMessage: z.string().optional(),
  language: z.enum(['es', 'en']).default('es').describe('The language for the response.'),
});
export type WalletActivationInput = z.infer<typeof WalletActivationInputSchema>;

const WalletActivationOutputSchema = z.object({
  guidanceMessage: z.string().describe('A friendly message in the requested language.'),
  nextSteps: z.array(z.string()).optional().describe('Actionable steps in the requested language.'),
  isTransactionComplete: z.boolean(),
  confirmationDetails: z.string().optional(),
});
export type WalletActivationOutput = z.infer<typeof WalletActivationOutputSchema>;

export async function aiWalletActivationGuide(input: WalletActivationInput): Promise<WalletActivationOutput> {
  try {
    return await aiWalletActivationGuideFlow(input);
  } catch (error) {
    console.error('AI Flow Error:', error);
    // Fallback response if the AI service fails
    return {
      guidanceMessage: input.language === 'es' 
        ? "El sistema de guía automático está experimentando alta demanda. Por favor, procede con las instrucciones manuales para asegurar tu lugar."
        : "The automatic guide system is experiencing high demand. Please proceed with the manual instructions to secure your spot.",
      isTransactionComplete: false,
      nextSteps: input.language === 'es' 
        ? ["Conecta tu wallet TON", "Envía 1 USDT a la dirección oficial", "Entra al grupo de Telegram"]
        : ["Connect your TON wallet", "Send 1 USDT to the official address", "Join the Telegram group"],
    };
  }
}

const walletActivationPrompt = ai.definePrompt({
  name: 'walletActivationPrompt',
  input: {schema: WalletActivationInputSchema},
  output: {schema: WalletActivationOutputSchema},
  prompt: `You are an expert Web3 guide for the TON network and PEE Crypto Market.
Your task is to provide instructions in the requested language ({{{language}}}).
Current Step: {{{currentStep}}}
{{#if walletAddress}}Wallet: {{{walletAddress}}}{{/if}}

Guidelines for {{{language}}}:

1. 'initial': Welcome and explain the 1 USDT contribution to join Genesis Block.
2. 'walletConnected': Instruct to send 1 USDT to EQDyaPfKJD5Om5Nx9-3uOT7SKiOkiLG_4rkOLO3BZqYEGMO7. Remind them about TON gas fees.
3. 'usdtSent': Verification in progress.
4. 'confirmed': Success! Join Telegram for legal registration.
5. 'error': Explain issue and steps to fix.

Respond only with the JSON matching the schema. Translate all content to {{{language}}}.`,
});

const aiWalletActivationGuideFlow = ai.defineFlow(
  {
    name: 'aiWalletActivationGuideFlow',
    inputSchema: WalletActivationInputSchema,
    outputSchema: WalletActivationOutputSchema,
  },
  async (input) => {
    const {output} = await walletActivationPrompt(input);
    return output!;
  }
);
