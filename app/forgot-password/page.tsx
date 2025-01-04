"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { showToast } from '@/lib/toast'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would implement the actual password reset logic
      // For now, we'll just simulate a successful request
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API call
      showToast.success("Se o email existir em nossa base, você receberá um link para redefinir sua senha.")
      router.push('/login')
    } catch (error) {
      showToast.error("Ocorreu um erro. Por favor, tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 to-purple-50 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl sm:text-3xl text-center text-purple-800">Esqueceu sua senha?</CardTitle>
          <CardDescription className="text-center text-sm sm:text-base">
            Digite seu email para receber um link de redefinição de senha
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
            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-sm sm:text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar link de redefinição"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="link"
            className="text-purple-600 text-sm sm:text-base"
            onClick={() => router.push('/login')}
          >
            Voltar para o login
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

