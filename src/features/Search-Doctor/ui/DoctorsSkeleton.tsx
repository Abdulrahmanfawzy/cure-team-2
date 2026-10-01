import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SKELETON_COUNT = 6;

function DoctorCardSkeleton() {
  return (
    <Card className="h-full gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Avatar + name / specialty / rating */}
      <div className="flex items-center gap-3">
        <Skeleton className="size-14 shrink-0 rounded-full" />
        <div className="min-w-0 flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>

      {/* Price + actions (pinned to the bottom like the real card) */}
      <div className="mt-auto space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3.5 w-16" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
        </div>
      </div>
    </Card>
  );
}

type DoctorsSkeletonProps = {
  /** Grid classes so the skeleton mirrors the real doctors grid. */
  className?: string;
};

export default function DoctorsSkeleton({
  className = "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
}: DoctorsSkeletonProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="space-y-6 w-full"
    >
      <span className="sr-only">Loading doctors…</span>
      <div className={className}>
        {Array.from({ length: SKELETON_COUNT }, (_, i) => (
          <DoctorCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
