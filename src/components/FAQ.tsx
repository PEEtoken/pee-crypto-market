import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQ() {
  const faqs = [
    {
      q: "¿Qué es la red TON?",
      a: "The Open Network (TON) es una red blockchain de alta velocidad originalmente diseñada por el equipo de Telegram. Es ideal para retail por su escalabilidad masiva y rapidez."
    },
    {
      q: "¿Qué wallet recomiendan usar?",
      a: "Recomendamos Tonkeeper (disponible en iOS/Android) por su facilidad de uso, o directamente la 'Wallet' integrada dentro de Telegram para una experiencia sin fricciones."
    },
    {
      q: "¿Por qué solo 1 USDT?",
      a: "Queremos que la barrera de entrada sea mínima para demostrar que una comunidad masiva puede lograr capitalización real. El poder está en el número de fundadores."
    },
    {
      q: "¿Cómo registro mi wallet como fundador?",
      a: "Simplemente conecta tu wallet TON, envía 1 USDT a la dirección oficial y nuestra herramienta registrará automáticamente tu transacción en el Bloque Génesis."
    },
    {
      q: "¿Es seguro mi dinero?",
      a: "Las aportaciones se gestionan mediante una wallet multifirma (6/4). Ningún individuo tiene acceso solitario al capital; cada movimiento es auditado y aprobado colectivamente."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-headline font-bold text-primary mb-12 text-center">Preguntas Frecuentes</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-headline font-semibold text-lg text-primary hover:text-secondary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}