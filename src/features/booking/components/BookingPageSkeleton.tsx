import { Skeleton } from "@/components/ui/skeleton";

const AppointmentCardSkeleton = () => (
  <div className="flex min-h-50 w-full flex-col justify-between rounded-card bg-gray-200   p-3 pb-4 sm:max-w-99">
    <div className="mb-2 flex items-center justify-between  pb-3">
      <Skeleton className="h-4 w-40" />
      <Skeleton className="h-4 w-16" />
    </div>

    <div className="my-4 flex items-center gap-3">
      <Skeleton className="size-11 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-36 max-w-full" />
        <Skeleton className="h-3 w-24 max-w-full" />
      </div>
    </div>

    <div className="flex gap-3">
      <Skeleton className="h-10 flex-1 rounded-action" />
      <Skeleton className="h-10 flex-1 rounded-action" />
    </div>
  </div>
);

const BookingPageSkeleton = () => (
  <main
    aria-label="Loading appointments"
    aria-busy="true"
    className="container mt-9 min-h-screen p-4 sm:p-6"
  >
    <div className="mx-auto max-w-250">
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 flex-col justify-end gap-5 sm:gap-7">
          <Skeleton className="h-7 w-52 max-w-full" />
          <div className="flex gap-2 overflow-hidden">
            <Skeleton className="h-11 w-20 shrink-0 rounded-md" />
            <Skeleton className="h-11 w-28 shrink-0 rounded-md" />
            <Skeleton className="h-11 w-28 shrink-0 rounded-md" />
            <Skeleton className="h-11 w-24 shrink-0 rounded-md" />
          </div>
        </div>

        <Skeleton className="h-12 w-full rounded-xl sm:max-w-99" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <AppointmentCardSkeleton key={index} />
        ))}
      </div>
    </div>
  </main>
);

export default BookingPageSkeleton;