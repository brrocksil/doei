import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Sobre o Doei</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Nossa Missão</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              O Doei é uma plataforma inovadora que conecta pessoas generosas com aqueles que necessitam, promovendo uma cultura de doação e reutilização. Nossa missão é criar uma comunidade onde o ato de doar seja simples, seguro e gratificante, contribuindo para um mundo mais sustentável e solidário.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Nossa História</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              Fundado em 2023 por um grupo de empreendedores sociais, o Doei nasceu da ideia de que todos têm algo para doar e alguém que precisa desse algo. Desde então, nossa plataforma já ajudou milhares de pessoas a encontrar novos lares para seus itens e a obter o que precisam sem custo.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-12">
        <h2 className="text-3xl font-semibold mb-6">Nosso Impacto</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-primary/10 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-primary mb-2">10.000+</h3>
            <p>Itens doados</p>
          </div>
          <div className="bg-primary/10 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-primary mb-2">5.000+</h3>
            <p>Usuários ativos</p>
          </div>
          <div className="bg-primary/10 p-6 rounded-lg">
            <h3 className="text-2xl font-bold text-primary mb-2">100+</h3>
            <p>Cidades atendidas</p>
          </div>
        </div>
      </div>
    </div>
  )
}

