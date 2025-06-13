'use client';
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../button";
import { motion } from "framer-motion";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative flex justify-center items-center min-h-screen w-full bg-transparent">
      {/* Background Image for small screens */}
      <div className="absolute top-0 left-0 right-0 bottom-0 h-full w-full md:hidden -z-10">
        <Image
          src="/house.jpg"
          alt="Picture of a house"
          fill
          className="object-cover"
        />
      </div>

      {/* Form */}
      <div className="md:w-1/2 md:h-screen rounded-xl md:rounded-none flex items-center justify-center bg-green-50 md:p-5">
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-96 h-fit bg-white bg-opacity-90 border border-gray-200 z-10 p-8 rounded-xl"
        >
          <h1 className="text-2xl font-bold mb-4">Login to <span className="text-green-500 underline">Roofsy.</span></h1>
          <div className="space-y-4">
            <div className="flex flex-col w-full mt-10">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                className="mt-1 text-sm border border-gray-200 h-11 rounded-xl p-2 w-full"
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
          </div>
          <Button className="mt-10 w-full justify-center">Login</Button>

          <div className="inline-flex items-center justify-center w-full relative">
            <hr className="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
              or
            </span>
          </div>

          <Button className="w-full justify-center bg-green-100! hover:bg-green-300!">
            <Image src="/google-icon.png" width={20} height={20} alt="Google icon" className="mr-1" />
            Sign in with Google
          </Button>

          <div className="mt-4 flex justify-center">
            <Link className="text-sm text-center" href="/sign-up">
              Don&rsquo;t have an account?
              {" "}
              <span className="text-green-500 font-bold underline cursor-pointer">
                Sign up here
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
        />
      </div>
    </div>
  );
}
