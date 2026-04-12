"use client";

import React, { useState } from "react";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthHandlers } from "../auth-handler";
import { useRefetchQueries } from "@/lib/react-query";
import { SkillBridgeLoader } from "@/components/shared/SkillBridgeLoader";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

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
        const res = await signIn(value);
        console.log(res);
      
      // console.log(user,error);
      
        if(!res.success){
          toast.error("")
        }
        if (res.data.user) {
          // 2. Trigger the "Global Loading" state immediately
          toast.success("You are Logged in successfully")
          setIsRedirecting(true);
          
          await refetchQueries("user-profile");

          // Determine route
          const url = res.data.user.role === "TUTOR" 
            ? "/tutor/dashboard" 
            : res.data.user.role === "STUDENT" 
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

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-zinc-200 dark:border-zinc-800" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white dark:bg-zinc-950 px-3 text-zinc-400 font-bold">Or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-xl font-bold border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
          onClick={() => toast.info("Google login coming soon!")}
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-12 rounded-xl font-bold border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
          onClick={() => toast.info("Facebook login coming soon!")}
        >
          <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          Facebook
        </Button>
      </div>

      {/* Demo Login Button */}
      <div className="mt-4">
        <Button
          type="button"
          variant="outline"
          className="w-full h-12 rounded-xl font-bold border-dashed border-2 border-indigo-300 dark:border-indigo-700 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30"
          onClick={() => {
            form.setFieldValue("email", "student@skillbridge.com");
            form.setFieldValue("password", "123456");
            toast.info("Demo credentials filled! Click Sign In to continue.");
          }}
        >
          🚀 Try Demo Account
        </Button>
      </div>
    </div>
  );
}