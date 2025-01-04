import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "Como posso doar um item?",
      answer: "Para doar um item, siga estes passos simples: 1) Faça login na sua conta Doei. 2) Clique no botão 'Doar Item' no cabeçalho. 3) Preencha o formulário com as informações do item, incluindo fotos e descrição. 4) Revise e envie sua doação. Nosso time irá revisar e aprovar seu item em breve."
    },
    {
      question: "É seguro doar ou receber itens pelo Doei?",
      answer: "Sim, a segurança é nossa prioridade. Implementamos várias medidas de segurança, incluindo verificação de usuários, sistema de avaliações e diretrizes para encontros seguros. Recomendamos que os usuários se encontrem em locais públicos para a troca de itens e que verifiquem as avaliações de outros usuários antes de agendar um encontro."
    },
    {
      question: "Posso doar qualquer tipo de item?",
      answer: "A maioria dos itens em boas condições são aceitos, mas alguns itens são proibidos por razões de segurança ou legais. Itens proibidos incluem: armas, drogas ilegais, itens perigosos ou tóxicos, alimentos perecíveis, medicamentos, e itens falsificados ou roubados. Consulte nossos Termos de Uso para uma lista completa de itens proibidos."
    },
    {
      question: "Como funciona o processo de solicitação de um item?",
      answer: "Para solicitar um item: 1) Navegue ou pesquise o item desejado. 2) Clique no botão 'Solicitar Item' na página do item. 3) Escreva uma breve mensagem ao doador explicando por que você precisa do item. 4) Aguarde a resposta do doador. Se aprovado, você poderá combinar os detalhes para a retirada do item."
    },
    {
      question: "O Doei cobra alguma taxa?",
      answer: "Não, o Doei é uma plataforma totalmente gratuita para doadores e receptores. Não cobramos taxas por listagens, transações ou uso da plataforma. Mantemos o Doei através de doações voluntárias e parcerias com organizações que compartilham nossa missão."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Perguntas Frequentes (FAQ)</h1>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

