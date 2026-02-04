"use client";

import React, { useState } from "react"; // Added useState
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Loader2, Sparkles } from "lucide-react"; // Added Sparkles for flair
import { useRouter } from "next/navigation";
import { useAuthHandlers } from "../auth-handler";
import { useRefetchQueries } from "@/lib/react-query";
import { SkillBridgeLoader } from "@/components/shared/SkillBridgeLoader";
import { toast } from "sonner";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function SignInForm() {
  const router = useRouter();
  const { signIn } = useAuthHandlers();
  const { refetchQueries } = useRefetchQueries();
  
  // 1. New State to track the transition period
  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onChange: signInSchema },
    onSubmit: async ({ value }) => {
      try {
        const { user,error } = await signIn(value);
      
        if(error){
          toast.error(error)
        }
        if (user) {
          // 2. Trigger the "Global Loading" state immediately
          toast.success("You are Logged in successfully")
          setIsRedirecting(true);
          
          await refetchQueries("user-profile");

          // Determine route
          const url = user.role === "TUTOR" 
            ? "/tutor/dashboard" 
            : user.role === "STUDENT" 
            ? "/dashboard" 
            : "/admin";

          // Use window.location for a fresh state, or router.push for SPA speed
          // window.location.href = route;
          router.push(url)
        }
      } catch (error) {
        setIsRedirecting(false); // Reset if login fails
        console.error("Login failed", error);
      }
    },
  });

  return (
    <div className="w-full relative">
      {/* --- 3. FULL SCREEN LOADING OVERLAY --- */}
      {isRedirecting && (
        <SkillBridgeLoader/>
      )}

      <form
        className="mt-6 space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        {/* Email Field */}
        <form.Field
          name="email"
          children={(field) => (
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Email address
              </label>
              <input
                type="email"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="name@company.com"
                className={`block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border ${
                  field.state.meta.errors.length ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"
                } rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-600 transition-all outline-none`}
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-[11px] text-red-500 font-bold uppercase tracking-tight">
                  {field.state.meta.errors.map((err: any) => err.message || err).join(", ")}
                </p>
              )}
            </div>
          )}
        />

        {/* Password Field */}
        <form.Field
          name="password"
          children={(field) => (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  Password
                </label>
                <a href="#" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="••••••••"
                className={`block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border ${
                  field.state.meta.errors.length ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"
                } rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-600 transition-all outline-none`}
              />
            </div>
          )}
        />

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || (isSubmitting as boolean) || isRedirecting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-black uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {(isSubmitting as boolean) || isRedirecting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </button>
          )}
        />
      </form>
    </div>
  );
}