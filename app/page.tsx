import Link from 'next/link'
import { Button } from "@/components/ui/button"
import FeaturedItems from '@/components/featured-items'
import CategoryNav from '@/components/category-nav'
import Image from 'next/image'
import RecentlyAddedItems from '@/components/recently-added-items'
import MostExploredItems from '@/components/most-explored-items'

export default function Home() {
  return (
    <main>
      <CategoryNav />
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-neutral-800">
              Itens em Destaque
            </h2>
            <p className="text-neutral-600">
              Descubra itens incríveis disponíveis para doação em sua região
            </p>
          </div>
          <FeaturedItems />
          <div className="text-center mt-8">
            <Link href="/browse?category=featured">
              <Button variant="outline">Ver mais itens em destaque</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-neutral-800">
              Itens Recém Adicionados
            </h2>
            <p className="text-neutral-600">
              Confira as últimas doações disponíveis na plataforma
            </p>
          </div>
          <RecentlyAddedItems />
          <div className="text-center mt-8">
            <Link href="/browse?category=recent">
              <Button variant="outline">Ver mais itens recentes</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-neutral-800">
              Itens Mais Explorados
            </h2>
            <p className="text-neutral-600">
              Descubra os itens mais populares entre os usuários
            </p>
          </div>
          <MostExploredItems />
          <div className="text-center mt-8">
            <Link href="/browse?category=popular">
              <Button variant="outline">Ver mais itens populares</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

