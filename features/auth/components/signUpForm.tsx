"use client";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Loader2 } from "lucide-react"; // লোডার আইকন
import { useRouter } from "next/navigation";
import { useAuthHandlers } from '../auth-handler';

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpValues = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter();
   const {signUp} = useAuthHandlers()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    }
  });

  const onSubmit = async (data: SignUpValues) => {
  await signUp(data)
  };



  return (
    <div className="bg-white dark:bg-zinc-900 py-8 px-4 shadow-2xl border border-zinc-200 dark:border-zinc-800 sm:rounded-2xl sm:px-10">
      
  
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Full Name</label>
          <div className="mt-1 relative">
            <input 
              type="text" 
              placeholder="John Doe" 
              {...register("name")}
              disabled={isSubmitting}
              className={`block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border ${errors.name ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-600 transition-all outline-none disabled:opacity-50`} 
            />
          </div>
          {errors.name && <p className='mt-1 text-xs text-red-500 font-medium'>{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Email address</label>
          <input 
            type="email" 
            placeholder="name@example.com" 
            {...register("email")}
            disabled={isSubmitting}
            className={`mt-1 block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border ${errors.email ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-600 transition-all outline-none disabled:opacity-50`} 
          />
          {errors.email && <p className='mt-1 text-xs text-red-500 font-medium'>{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            {...register("password")}
            disabled={isSubmitting}
            className={`mt-1 block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border ${errors.password ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-600 transition-all outline-none disabled:opacity-50`} 
          />
          {errors.password && <p className='mt-1 text-xs text-red-500 font-medium'>{errors.password.message}</p>}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">Confirm Password</label>
          <input 
            type="password" 
            placeholder="••••••••" 
            {...register("confirmPassword")}
            disabled={isSubmitting}
            className={`mt-1 block w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-800 border ${errors.confirmPassword ? 'border-red-500' : 'border-zinc-300 dark:border-zinc-700'} rounded-xl text-zinc-900 dark:text-zinc-100 focus:ring-2 focus:ring-indigo-600 transition-all outline-none disabled:opacity-50`} 
          />
          {errors.confirmPassword && <p className='mt-1 text-xs text-red-500 font-medium'>{errors.confirmPassword.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
    </div>
  );
}