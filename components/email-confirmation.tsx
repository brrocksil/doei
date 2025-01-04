import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { showToast } from '@/lib/toast'

interface EmailConfirmationProps {
  email: string;
  onConfirmSuccess: () => void;
}

export function EmailConfirmation({ email, onConfirmSuccess }: EmailConfirmationProps) {
  const [confirmationCode, setConfirmationCode] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would implement the actual confirmation logic
    // For now, we'll just simulate a successful confirmation
    if (confirmationCode.length === 6) {
      showToast.success("Código confirmado com sucesso!")
      onConfirmSuccess()
    } else {
      showToast.error("Código inválido. Por favor, tente novamente.")
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl sm:text-3xl text-center text-purple-800">Confirme seu email</CardTitle>
        <CardDescription className="text-center text-sm sm:text-base">
          Um código de confirmação foi enviado para {email}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="confirmationCode" className="text-sm sm:text-base">Código de Confirmação</Label>
            <Input
              id="confirmationCode"
              type="text"
              placeholder="Digite o código de 6 dígitos"
              value={confirmationCode}
              onChange={(e) => setConfirmationCode(e.target.value)}
              maxLength={6}
              required
              className="text-sm sm:text-base"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-sm sm:text-base"
          >
            Confirmar
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button
          variant="link"
          className="text-purple-600 text-sm sm:text-base"
          onClick={() => setConfirmationCode('')}
        >
          Reenviar código
        </Button>
      </CardFooter>
    </Card>
  )
}

