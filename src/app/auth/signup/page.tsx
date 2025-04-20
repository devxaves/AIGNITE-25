"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignUp, useSignIn } from "@clerk/nextjs";
import { toast } from "sonner";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components";

const SignUpPage = () => {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    if (!name || !email || !password) return toast.error("Please fill in all fields");

    setIsLoading(true);

    try {
      await signUp.create({
        emailAddress: email,
        password,
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1] || "",
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setIsVerified(true);
    } catch (error: any) {
      const code = error?.errors?.[0]?.code;
      switch (code) {
        case "form_identifier_exists":
          toast.error("This email is already registered. Please sign in.");
          break;
        case "form_password_pwned":
          toast.error("Password too common. Choose a stronger one.");
          break;
        case "form_param_format_invalid":
          toast.error("Invalid email format.");
          break;
        case "form_password_length_too_short":
          toast.error("Password too short.");
          break;
        default:
          toast.error("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !code) return toast.error("Enter the verification code");

    setIsVerifying(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({ code });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/auth/auth-callback");
      } else {
        toast.error("Invalid code. Please try again.");
      }
    } catch (err) {
      toast.error("Verification failed. Try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 p-4">
      <div className="w-full max-w-md rounded-3xl p-8 shadow-2xl backdrop-blur-xl bg-white/10 transition-transform hover:scale-[1.03] duration-300">
        <div className="flex flex-col gap-4 text-center">
          <Link href="/">
            <Icons.logo className="mx-auto w-16 h-16 text-white hover:text-pink-300 transition-colors" />
          </Link>
          <h1 className="text-4xl font-extrabold font-heading bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-500">
            {isVerified ? "Verify Email" : "Sign Up"}
          </h1>
          <p className="text-white/80 text-lg">
            {isVerified
              ? `We've sent a verification code to ${email}`
              : "Create an account to start using "}
            {!isVerified && (
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-pink-800">
                Swasthya Darpan
              </span>
            )}
          </p>
        </div>

        {isVerified ? (
          <form onSubmit={handleVerify} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-white text-xl font-semibold">
                Verification Code
              </Label>
              <InputOTP
                maxLength={6}
                value={code}
                disabled={isVerifying}
                onChange={(val) => setCode(val)}
                className="gap-2"
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, idx) => (
                    <InputOTPSlot
                      key={idx}
                      index={idx}
                      className="w-12 h-12 bg-white/60 border-2 border-indigo-300 rounded-xl text-indigo-800 font-bold text-2xl focus:ring-4 focus:ring-pink-400 transition-all duration-300"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isVerifying}
              className="w-full py-3 text-lg font-bold text-white rounded-xl bg-gradient-to-r from-blue-500 to-pink-500 hover:from-blue-600 hover:to-pink-600 transition-all shadow-lg"
            >
              {isVerifying ? (
                <LoaderIcon className="w-6 h-6 animate-spin" />
              ) : (
                "Verify Code"
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white text-xl font-semibold">
                Full Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full text-lg text-white placeholder-white bg-white/20 border-white border-opacity-30 rounded-xl px-4 py-3 focus:ring-4 focus:ring-pink-400 placeholder-opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-xl font-semibold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full text-lg text-white placeholder-white bg-white/20 border-white border-opacity-30 rounded-xl px-4 py-3 focus:ring-4 focus:ring-pink-400 placeholder-opacity-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-xl font-semibold">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full text-lg text-white placeholder-white bg-white/20 border-white border-opacity-30 rounded-xl px-4 py-3 pr-12 focus:ring-4 focus:ring-pink-400 placeholder-opacity-50"
                />
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="absolute top-1/2 right-2 -translate-y-1/2 p-1 rounded-full hover:bg-white/20 transition"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="w-5 h-5 text-white" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-white" />
                  )}
                </Button>
              </div>
            </div>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading}
              className="w-full py-3 text-lg font-bold text-white rounded-xl bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 transition-all shadow-lg"
            >
              {isLoading ? (
                <LoaderIcon className="w-6 h-6 animate-spin" />
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        )}

        {!isVerified && (
          <p className="text-white/80 text-lg mt-6 text-center">
            Been here before?{" "}
            <Link
              href="/auth/signin"
              className="text-pink-300 font-semibold underline hover:text-pink-100 transition-colors"
            >
              Sign In
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
