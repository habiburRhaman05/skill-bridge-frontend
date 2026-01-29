
import SignInForm from '@/features/auth/components/signInForm';
import Link from 'next/link';

export default function SignIn() {


  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Don't have an account?{' '}
          <Link href="/sign-up" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500">
            Create one for free
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-zinc-900 py-8 px-4 shadow-xl border border-zinc-200 dark:border-zinc-800 sm:rounded-2xl sm:px-10">

<SignInForm/>


        </div>
      </div>
    </div>
  );
}