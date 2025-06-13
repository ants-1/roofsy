import { Suspense } from "react"
import LoginForm from "../ui/forms/login-form"

export default function LoginPage() {
  return (
    <main>
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  )
}