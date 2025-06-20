'use client';
import { useState, useActionState } from "react";
import { Eye, EyeOff, OctagonAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../components/button";
import { motion } from "framer-motion";
import { signUp } from "@/app/lib/actions";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, formAction, isPending] = useActionState(
    signUp,
    undefined
  )

  return (
    <div className="relative flex justify-center items-center min-h-screen w-full bg-transparent">
      {/* Background Image for small screens */}
      <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full md:hidden -z-10">
        <Image
          src="/house.jpg"
          alt="Picture of a house"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Form */}
      <div className="md:w-1/2 md:h-screen rounded-xl md:rounded-none flex items-center justify-center bg-green-50 md:p-5">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-96 h-fit bg-white bg-opacity-90 border border-gray-200 z-10 p-8 rounded-xl"
          action={formAction}
        >
          <h1 className="text-2xl font-bold mb-4">Sign Up to <span className="text-green-500 underline">Roofsy.</span></h1>
          <div className="space-y-4">
            <div className="flex flex-col w-full mt-10">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Enter your name"
                className="mt-1 border text-sm border-gray-200 h-11 rounded-xl p-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1 border text-sm border-gray-200 h-11 rounded-xl p-2 w-full"
                required
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="password">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••"
                  className="mt-1 border text-sm border-gray-200 h-11 rounded-xl p-2 w-full pr-10 "
                  required
                />
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute rounded-l-none inset-y-1 right-0 flex items-center px-2.5!"
                >
                  {showPassword ? (
                    <Eye />
                  ) : (
                    <EyeOff />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••"
                  className="mt-1 border text-sm h-11 border-gray-200 rounded-xl p-2 w-full pr-10"
                  required
                />
                <Button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute rounded-l-none inset-y-1 right-0 flex items-center px-2.5!"
                >
                  {showConfirmPassword ? (
                    <Eye />
                  ) : (
                    <EyeOff />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <Button className="mt-10 w-full justify-center" aria-disabled={isPending}>Sign Up</Button>

          {errorMessage && (
            <div className="flex justify-center mt-2">
              <OctagonAlert className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}

          <div className="mt-4 flex justify-center">
            <Link className="text-sm text-center" href="/login">
              Already have an account?{" "}
              <span className="text-green-500 font-bold underline cursor-pointer">
                Login here
              </span>
            </Link>
          </div>
        </motion.form>
      </div>


      {/* Side Image for md+ screens */}
      <div className="hidden md:block relative w-1/2 h-screen">
        <Image
          src="/house.jpg"
          alt="Picture of a house"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
