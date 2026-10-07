"use client";

import { AlertTriangleIcon, RotateCcwIcon } from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen items-center justify-center bg-zinc-950 font-sans text-zinc-100 antialiased">
        <div className="flex flex-col items-center justify-center px-4 text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
            <AlertTriangleIcon className="size-6" />
          </div>
          <h2 className="mb-2 text-xl font-semibold">Something went wrong</h2>
          <p className="mb-6 max-w-md text-sm text-zinc-400">
            An unexpected error occurred. Please try reloading the application.
          </p>
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800"
          >
            <RotateCcwIcon className="size-4" />
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
