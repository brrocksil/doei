"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { showToast } from '@/lib/toast'
import { useAuth } from '@/contexts/AuthContext'
import { Spinner } from "@/components/ui/spinner"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await login(email, password)
      showToast.success("Login bem-sucedido")
      const redirectTo = searchParams.get('redirect') || '/profile'
      router.push(redirectTo)
    } catch (error) {
      showToast.error("Email ou senha incorretos.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-purple-50 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl sm:text-3xl text-center text-purple-800">Bem-vindo ao Doei</CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">
            Entre para continuar com sua doação
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm sm:text-base">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-sm sm:text-base"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-sm sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? <Spinner /> : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button
            variant="link"
            className="text-purple-600 text-sm sm:text-base"
            onClick={() => router.push('/forgot-password')}
          >
            Esqueceu sua senha?
          </Button>
          <Button
            variant="link"
            className="text-purple-600 text-sm sm:text-base"
            onClick={() => router.push('/cadastro')}
          >
            Criar uma conta
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

