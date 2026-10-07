"use client";

import { AlertTriangleIcon, RotateCcwIcon } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for debugging
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex size-12 items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/10 text-destructive">
        <AlertTriangleIcon className="size-6" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">Something went wrong</h2>
      <p className="mb-6 max-w-md text-sm text-muted-foreground">
        We encountered an error while loading this page. Please try refreshing or check back in a moment.
      </p>
      <Button onClick={() => reset()} variant="outline" className="gap-2">
        <RotateCcwIcon className="size-4" />
        Try again
      </Button>
    </div>
  );
}
