import { Loader2 } from 'lucide-react'
import React from 'react'

const loading = () => {
  return (
  <div className="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
          <p className="text-sm font-medium text-zinc-500 tracking-tight">Syncing session data...</p>
        </div>
      </div>
  )
}

export default loading