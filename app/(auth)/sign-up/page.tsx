
import SignUpForm from '@/features/auth/components/signUpForm';

export default function SignUp() {

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Already have an account?{' '}
          <a href="/sign-in" className="font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 underline underline-offset-4">
            Sign in
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
       <SignUpForm/>
      </div>
    </div>
  );
}