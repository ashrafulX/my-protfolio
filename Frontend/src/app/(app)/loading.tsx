export default function Loading() {
  return (
    <div className="mx-auto md:max-w-3xl" role="status" aria-live="polite">
      <div className="h-56 border-x border-edge sm:h-64" />
      <div className="space-y-4 border-x border-edge px-4 py-8">
        <div className="h-8 w-2/3 animate-pulse rounded bg-muted" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
        <span className="sr-only">Loading portfolio content</span>
      </div>
    </div>
  );
}
