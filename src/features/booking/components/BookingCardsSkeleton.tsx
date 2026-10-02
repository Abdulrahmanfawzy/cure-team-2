import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_COUNT = 6;

function BookingCardSkeleton() {
  return (
    <div className="w-full rounded-card border border-neutral-lighter bg-white p-3 pb-4">
      {/* Date + status row */}
      <div className="flex items-center justify-between border-b border-b-neutral-lighter pb-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 rounded-md" />
          <Skeleton className="h-3 w-32" />
        </div>
        <Skeleton className="h-4 w-14" />
      </div>

      {/* Doctor row */}
      <div className="my-4 flex items-center gap-2">
        <Skeleton className="h-10.25 w-10.75 rounded-full" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-4 w-2/5" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>

      {/* Actions row (two buttons, like every card state) */}
      <div className="mt-2 flex gap-2">
        <Skeleton className="h-10 flex-1 rounded-action" />
        <Skeleton className="h-10 flex-1 rounded-action" />
      </div>
    </div>
  );
}

type BookingCardsSkeletonProps = {
  /** Grid classes so the skeleton mirrors the real appointments grid. */
  className?: string;
};

export default function BookingCardsSkeleton({
  className = "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3",
}: BookingCardsSkeletonProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={className}
    >
      <span className="sr-only">Loading appointments…</span>
      {Array.from({ length: SKELETON_COUNT }, (_, i) => (
        <BookingCardSkeleton key={i} />
      ))}
    </div>
  );
}
