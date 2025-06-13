import { Suspense } from "react";
import SignUpForm from "../ui/forms/sign-up";

export default function SignUpPage() {
  return (
    <main>
      <Suspense>
        <SignUpForm />
      </Suspense>
    </main>
  )
}