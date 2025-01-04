import Link from 'next/link'
import { Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-white text-gray-600">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
            <p className="text-sm">
              O Doei é uma plataforma que conecta pessoas generosas com aqueles que precisam, promovendo a cultura da doação e reutilização.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-primary">Sobre</Link></li>
              <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Termos de Uso</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Política de Privacidade</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <p className="text-sm">Email: contato@doei.com</p>
            <p className="text-sm">Telefone: (11) 1234-5678</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-primary"><Twitter /></a>
              <a href="#" className="text-gray-400 hover:text-primary"><Instagram /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Doei. Todos os direitos reservados.</p>
          <p className="text-sm mt-2">
            Ajude-nos a manter esta plataforma. Considere fazer uma contribuição para apoiar nossa missão.
          </p>
        </div>
      </div>
    </footer>
  )
}

