export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Política de Privacidade</h1>
      <div className="max-w-3xl mx-auto space-y-6">
        <p className="text-lg">
          O Doei valoriza sua privacidade. Esta política descreve como coletamos, usamos e protegemos suas informações:
        </p>
        <section>
          <h2 className="text-2xl font-semibold mb-4">1. Coleta de Informações</h2>
          <p>Coletamos informações pessoais quando você as fornece voluntariamente, como ao criar uma conta, listar um item para doação ou entrar em contato conosco. Essas informações podem incluir seu nome, endereço de e-mail, localização e detalhes sobre os itens que você doa ou solicita.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">2. Uso de Informações</h2>
          <p>Usamos suas informações para:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Fornecer, manter e melhorar nossos serviços</li>
            <li>Processar transações e enviar notificações relacionadas</li>
            <li>Responder a seus comentários e perguntas</li>
            <li>Proteger contra atividades fraudulentas ou ilegais</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">3. Compartilhamento de Informações</h2>
          <p>Não vendemos suas informações pessoais a terceiros. Podemos compartilhar informações com:</p>
          <ul className="list-disc pl-6 mt-2">
            <li>Outros usuários do Doei (por exemplo, quando você doa ou solicita um item)</li>
            <li>Prestadores de serviços que nos ajudam a operar o Doei</li>
            <li>Autoridades legais, se exigido por lei</li>
          </ul>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">4. Segurança de Dados</h2>
          <p>Implementamos medidas de segurança para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. No entanto, nenhum método de transmissão pela Internet é 100% seguro.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">5. Seus Direitos</h2>
          <p>Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Para exercer esses direitos, entre em contato conosco através do e-mail privacy@doei.com.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">6. Alterações nesta Política</h2>
          <p>Podemos atualizar esta política periodicamente. Notificaremos você sobre quaisquer alterações publicando a nova política de privacidade nesta página.</p>
        </section>
        <p className="text-lg font-semibold">
          Ao usar o Doei, você concorda com esta política de privacidade. Se você tiver alguma dúvida, entre em contato conosco.
        </p>
      </div>
    </div>
  )
}

